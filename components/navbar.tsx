"use client";

import {
  ChevronDown,
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  Utensils,
  X
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/#featured", label: "Shop/Menu" },
  { href: "/about", label: "About Us" },
  { href: "/deals", label: "Deals" }
];

const searchSuggestions = [
  "Chicken adobo",
  "Vegan bowls",
  "Nut-free meals",
  "Fresh lumpia",
  "Desserts",
  "Family bundles"
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const filteredSuggestions = searchSuggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-gray-50/95 backdrop-blur">
      <div className="border-b border-gray-200 bg-gray-900 text-sm text-gray-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
          <button
            type="button"
            className="inline-flex min-w-0 items-center gap-2 font-semibold"
            aria-label="Set delivery address"
          >
            <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">Delivering to Phoenix, AZ 85004</span>
            <ChevronDown className="hidden h-4 w-4 sm:block" aria-hidden="true" />
          </button>
          <p className="hidden shrink-0 font-medium text-gray-300 md:block">
            Free delivery over $35
          </p>
        </div>
      </div>

      <nav
        className="mx-auto grid max-w-7xl grid-cols-[auto_auto] items-center gap-3 px-4 py-3 sm:px-6 md:grid-cols-[auto_minmax(240px,1fr)_auto] lg:px-8"
        aria-label="Main navigation"
      >
        <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold text-gray-950">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-gray-900 text-white">
            <Utensils className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>Savory Base</span>
        </Link>

        <div className="relative order-3 col-span-2 md:order-none md:col-span-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            onBlur={() => window.setTimeout(() => setIsSearchOpen(false), 120)}
            placeholder="Search dishes, ingredients, dietary tags"
            className="h-11 w-full rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm font-medium text-gray-950 outline-none transition placeholder:text-gray-500 focus:border-gray-700 focus:ring-2 focus:ring-gray-300"
            aria-label="Search menu"
          />
          {isSearchOpen ? (
            <div className="absolute left-0 right-0 top-12 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
              {(filteredSuggestions.length > 0 ? filteredSuggestions : searchSuggestions)
                .slice(0, 5)
                .map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="block w-full px-4 py-3 text-left text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-gray-950"
                    onMouseDown={() => setQuery(suggestion)}
                  >
                    {suggestion}
                  </button>
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
                className="text-sm font-semibold text-gray-700 transition hover:text-gray-950"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/login"
            className="hidden h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-200 hover:text-gray-950 sm:inline-flex"
          >
            <UserRound className="h-5 w-5" aria-hidden="true" />
            Login
          </Link>

          <Link
            href="/cart"
            aria-label="Shopping cart"
            className="relative inline-flex h-11 items-center gap-2 rounded-md bg-gray-900 px-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-950"
          >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            <span className="hidden sm:inline">$0.00</span>
            <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-gray-900 ring-1 ring-gray-300">
              0
            </span>
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-800 transition hover:bg-gray-200 md:hidden"
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
        <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-3 text-base font-semibold text-gray-800 transition hover:bg-gray-200 hover:text-gray-950"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="rounded-md px-3 py-3 text-base font-semibold text-gray-800 transition hover:bg-gray-200 hover:text-gray-950"
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
