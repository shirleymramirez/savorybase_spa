"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Clock3,
  CreditCard,
  HeartHandshake,
  Leaf,
  ShieldCheck,
  Truck,
  WheatOff
} from "lucide-react";
import { ProductGrid } from "@/components/product-grid";

const heroSlides = [
  {
    src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1800&q=85",
    alt: "A colorful spread of fresh vegetables and prepared dishes"
  },
  {
    src: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1800&q=85",
    alt: "A warm bowl of soup with fresh herbs"
  },
  {
    src: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1800&q=85",
    alt: "A bright market salad with citrus and greens"
  }
];

const categories = [
  {
    name: "Appetizers",
    href: "/#featured",
    image:
      "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Mains",
    href: "/#featured",
    image:
      "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Desserts",
    href: "/#featured",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Beverages",
    href: "/#featured",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80"
  }
];

const testimonials = [
  {
    quote:
      "The delivery was quick, the adobo bowl arrived hot, and the flavors tasted like a Sunday family table.",
    name: "Marisol T.",
    detail: "Verified local customer"
  },
  {
    quote:
      "Savory Base is my weeknight reset. The meals are fresh, clear about allergens, and easy to reorder.",
    name: "Jordan P.",
    detail: "Phoenix meal-plan regular"
  },
  {
    quote:
      "The lumpia and grain bowls are always party-ready. I love that the menu labels make dietary picks simple.",
    name: "Ari G.",
    detail: "Catering customer"
  }
];

const trustBadges = [
  { label: "25-45 min local delivery", icon: Truck },
  { label: "Secure checkout", icon: ShieldCheck },
  { label: "Vegan options", icon: Leaf },
  { label: "Nut-free picks", icon: WheatOff },
  { label: "Dietary notes", icon: BadgeCheck },
  { label: "Cards accepted", icon: CreditCard }
];

const blogPosts = [
  "How to build a balanced Filipino-inspired grain bowl",
  "Meal prep tips for reheating sauces, stews, and sides",
  "Behind the menu: bright citrus, slow-roasted aromatics, and fresh herbs"
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  function selectCategory(categoryName: string | null) {
    setSelectedCategory(categoryName);
    window.requestAnimationFrame(() => {
      document.getElementById("featured")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }

  return (
    <>
      <section className="relative min-h-[calc(100vh-132px)] overflow-hidden bg-[#F4F0E6] text-[#2B241E]">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover ${index === 0 ? "opacity-90" : "opacity-0"}`}
            />
          ))}
          <div className="absolute inset-0 bg-[#F4F0E6]/80" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100vh-132px)] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#6E7A5E]">
            Pickup from Chandler or delivery in the Phoenix metro area.
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
            Filipino comfort food, ready to cook at home.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4F463B]">
            Order comforting dishes. We provide ready-to-cook Filipino staples and home-cooked favorites so you can enjoy authentic flavors with ease.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#featured"
              className="inline-flex h-12 items-center justify-center rounded-md bg-[#D9C7A7] px-6 text-base font-semibold text-[#2B241E] transition hover:bg-[#CBB58F]"
            >
              Order Now
            </Link>
            <Link
              href="/#categories"
              className="inline-flex h-12 items-center justify-center rounded-md border border-[#6E7A5E] px-6 text-base font-semibold text-[#2B241E] transition hover:bg-[#FAF7EF]"
            >
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

      {/* <div className="overflow-hidden border-y border-[#6E7A5E] bg-[#3F4A36] py-3 text-sm font-semibold text-[#FAF7EF]">
        <div className="flex min-w-max animate-promo gap-10 px-4">
          <span>Limited time: 15% off family bundles</span>
          <span>Free delivery on orders over $35</span>
          <span>New vegan and nut-free picks added weekly</span>
          <span>Order by 3 PM for dinner-window delivery</span>
        </div>
      </div> */}

      <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section id="categories" className="py-8">
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#6E7A5E]">
                Product Categories
              </p>
              <h2 className="mt-2 text-3xl font-bold text-[#2B241E] sm:text-4xl">
                Browse by craving
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#62584B]">
              Tap into appetizers, main courses, desserts, and beverages with image-led
              categories sized for desktop and mobile browsing.
            </p>
          </div>

          <div className="mb-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => selectCategory(null)}
              className={`rounded-md border px-4 py-2 text-sm font-semibold transition ${
                selectedCategory === null
                  ? "border-[#6E7A5E] bg-[#C7D3B5] text-[#2B241E]"
                  : "border-[#D8CDBB] bg-[#FAF7EF] text-[#4F463B] hover:border-[#8A6F4D]"
              }`}
            >
              All
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <button
                key={category.name}
                type="button"
                onClick={() => selectCategory(category.name)}
                aria-pressed={selectedCategory === category.name}
                className={`group relative aspect-[4/3] overflow-hidden rounded-lg bg-[#EFE7D8] text-left shadow-sm transition focus:outline-none focus:ring-2 focus:ring-[#6E7A5E] focus:ring-offset-2 ${
                  selectedCategory === category.name
                    ? "ring-4 ring-[#6E7A5E]"
                    : "hover:-translate-y-1"
                }`}
              >
                <Image
                  src={category.image}
                  alt={`${category.name} category`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#2B241E]/35" />
                <span className="absolute bottom-4 left-4 text-2xl font-bold text-[#FFFDF7]">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        <ProductGrid
          selectedCategory={selectedCategory}
          onClearCategory={() => setSelectedCategory(null)}
        />

        <section className="py-14" aria-labelledby="social-proof-heading">
          <div className="rounded-lg border border-[#D8CDBB] bg-[#FAF7EF] p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-[#6E7A5E]">
                  Social Proof
                </p>
                <h2
                  id="social-proof-heading"
                  className="mt-2 text-3xl font-bold text-[#2B241E] sm:text-4xl"
                >
                  Loved by local customers
                </h2>
              </div>
              <HeartHandshake className="h-10 w-10 text-[#6E7A5E]" aria-hidden="true" />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.name}
                  className="rounded-lg border border-[#D8CDBB] bg-[#FFFDF7] p-5"
                >
                  <p className="text-sm leading-6 text-[#4F463B]">{testimonial.quote}</p>
                  <p className="mt-4 font-bold text-[#2B241E]">{testimonial.name}</p>
                  <p className="text-sm text-[#62584B]">{testimonial.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <section className="flex min-h-full flex-col rounded-lg border border-[#D8CDBB] bg-[#FAF7EF] p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-[#2B241E]">Join the community</h2>
              <p className="mt-3 text-sm leading-6 text-[#62584B]">
                Follow menu drops, kitchen stories, and customer favorites across our
                active social channels.
              </p>
              <div className="mt-auto flex flex-wrap gap-3 pt-6">
                <Link
                  href="https://instagram.com"
                  className="rounded-md bg-[#D9C7A7] px-4 py-2 text-sm font-semibold text-[#2B241E] transition hover:bg-[#CBB58F]"
                >
                  Instagram
                </Link>
                <Link
                  href="https://tiktok.com"
                  className="rounded-md border border-[#8A6F4D] px-4 py-2 text-sm font-semibold text-[#4F463B] transition hover:bg-[#EFE7D8] hover:text-[#2B241E]"
                >
                  TikTok
                </Link>
              </div>
            </section>

            <section className="rounded-lg border border-[#D8CDBB] bg-[#FAF7EF] p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-[#2B241E]">Recipes & food stories</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {blogPosts.map((post) => (
                  <Link
                    key={post}
                    href="/blog"
                    className="rounded-md border border-[#D8CDBB] bg-[#FFFDF7] p-4 text-sm font-semibold text-[#4F463B] transition hover:border-[#8A6F4D] hover:text-[#2B241E]"
                  >
                    {post}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="py-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#6E7A5E]">
                Trust & Convenience
              </p>
              <h2 className="mt-2 text-3xl font-bold text-[#2B241E]">
                Clear delivery, payment, and dietary signals
              </h2>
            </div>
            <Clock3 className="hidden h-10 w-10 text-[#6E7A5E] sm:block" aria-hidden="true" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;

              return (
                <div
                  key={badge.label}
                  className="flex items-center gap-3 rounded-lg border border-[#D8CDBB] bg-[#FAF7EF] p-4 shadow-sm"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#C7D3B5] text-[#2B241E]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-[#4F463B]">{badge.label}</span>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
