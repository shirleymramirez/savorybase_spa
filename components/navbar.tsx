"use client";

import {
  Menu,
  Search,
  ShoppingCart,
  Utensils,
  X
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { fallbackFoods } from "@/lib/cms";
import { useCart } from "@/components/cart-provider";

const navLinks = [
  { href: "/#products", label: "Shop All" },
  { href: "/about", label: "About Us" },
  // { href: "/deals", label: "Deals" }
];

const SEARCH_DEBOUNCE_MS = 300;

interface SearchSuggestion {
  title: string;
  slug: string;
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { items, totalQuantity } = useCart();
  const cartTotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + parseFoodPrice(item.food.price) * item.quantity,
        0
      ),
    [items]
  );

  // Create search suggestions from static CMS data
  const allSuggestions = useMemo<SearchSuggestion[]>(() => {
    const uniqueTitles = new Set<string>();
    return fallbackFoods.reduce<SearchSuggestion[]>((suggestions, food) => {
      if (!food.title || uniqueTitles.has(food.title)) {
        return suggestions;
      }

      uniqueTitles.add(food.title);
      suggestions.push({
        title: food.title,
        slug: food.slug
      });

      return suggestions;
    }, []);
  }, []);

  const filteredSuggestions = useMemo(
    () =>
      allSuggestions.filter((suggestion) =>
        suggestion.title.toLowerCase().includes(debouncedQuery.toLowerCase())
      ),
    [debouncedQuery, allSuggestions]
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [query]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#D8CDBB] bg-[#FAF7EF]/95 backdrop-blur">
      <div className="border-b border-[#6E7A5E] bg-[#3F4A36]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8"></div>
      </div>
      <nav
        className="mx-auto grid max-w-7xl grid-cols-[auto_auto] items-center gap-3 px-4 py-3 sm:px-6 md:grid-cols-[auto_minmax(240px,1fr)_auto] lg:px-8"
        aria-label="Main navigation"
      >
        <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold text-[#2B241E]">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#6E7A5E] text-[#FAF7EF]">
            <Utensils className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>Savory Base</span>
        </Link>

        <div className="relative order-3 col-span-2 md:order-none md:col-span-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7A6E5E]" />
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            onBlur={() => window.setTimeout(() => setIsSearchOpen(false), 120)}
            placeholder="Search delicious meals..."
            className="h-11 w-full rounded-md border border-[#D8CDBB] bg-[#FFFDF7] pl-10 pr-4 text-sm font-medium text-[#2B241E] outline-none transition placeholder:text-[#7A6E5E] focus:border-[#6E7A5E] focus:ring-2 focus:ring-[#C7D3B5]"
            aria-label="Search menu here..."
          />
          {isSearchOpen ? (
            <div className="absolute left-0 right-0 top-12 overflow-hidden rounded-md border border-[#D8CDBB] bg-[#FFFDF7] shadow-lg">
              {(filteredSuggestions.length > 0 ? filteredSuggestions : allSuggestions)
                .slice(0, 5)
                .map((suggestion) => (
                  <Link
                    key={suggestion.slug}
                    href={`/${suggestion.slug}`}
                    className="block w-full px-4 py-3 text-left text-sm font-semibold text-[#62584B] transition hover:bg-[#EFE7D8] hover:text-[#2B241E]"
                    onMouseDown={() => setQuery(suggestion.title)}
                    onClick={() => setIsSearchOpen(false)}
                  >
                    {suggestion.title}
                  </Link>
                ))}
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-end gap-2">
          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-[#62584B] transition hover:text-[#2B241E]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/cart"
            aria-label="Shopping cart"
            className="relative inline-flex h-11 items-center gap-2 rounded-md bg-[#D9C7A7] px-3 text-sm font-semibold text-[#2B241E] shadow-sm transition hover:bg-[#CBB58F]"
          >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            <span className="hidden sm:inline">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
              }).format(cartTotal)}
            </span>
            <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#3F4A36] px-1 text-xs font-bold text-[#FAF7EF] ring-1 ring-[#D8CDBB]">
              {totalQuantity}
            </span>
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[#4F463B] transition hover:bg-[#EFE7D8] md:hidden"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {isOpen ? (
        <div className="border-t border-[#D8CDBB] bg-[#FAF7EF] px-4 py-3 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-3 text-base font-semibold text-[#4F463B] transition hover:bg-[#EFE7D8] hover:text-[#2B241E]"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="rounded-md px-3 py-3 text-base font-semibold text-[#4F463B] transition hover:bg-[#EFE7D8] hover:text-[#2B241E]"
              onClick={() => setIsOpen(false)}
            >
              Profile Login
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function parseFoodPrice(price: string) {
  const value = Number.parseFloat(price.replace(/[^0-9.]/g, ""));

  return Number.isFinite(value) ? value : 0;
}
