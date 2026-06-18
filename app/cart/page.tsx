"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart-provider";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

export default function CartPage() {
  const { items, totalQuantity, addItem, decreaseItem, removeItem } = useCart();
  const subtotal = items.reduce(
    (total, item) => total + parseFoodPrice(item.food.price) * item.quantity,
    0
  );
  // const estimatedTax = subtotal * 0.086;
  // const estimatedTotal = subtotal + estimatedTax;
    const estimatedTotal = subtotal;

  if (items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-12 text-center">
        <ShoppingCart className="h-12 w-12 text-[#6E7A5E]" aria-hidden="true" />
        <h1 className="mt-5 text-4xl font-bold text-[#2B241E]">Your cart is empty</h1>
        <p className="mt-4 max-w-xl text-[#4F463B]">
          Add a Savory Base favorite from the foods collection and it will appear here.
        </p>
        <Link
          href="/#products"
          className="mt-8 rounded-md bg-[#D9C7A7] px-5 py-3 text-sm font-semibold text-[#2B241E] transition hover:bg-[#CBB58F] focus:outline-none focus:ring-2 focus:ring-[#6E7A5E] focus:ring-offset-2"
        >
          Browse Foods
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#6E7A5E]">
            Your Shopping Cart
          </p>
          <h1 className="mt-2 text-4xl font-bold text-[#2B241E]">{totalQuantity} items in your cart</h1>
        </div>
        <Link
          href="/#products"
          className="inline-flex h-11 w-fit items-center justify-center rounded-md border border-[#8A6F4D] px-4 text-sm font-semibold text-[#4F463B] transition hover:bg-[#EFE7D8] hover:text-[#2B241E] focus:outline-none focus:ring-2 focus:ring-[#6E7A5E] focus:ring-offset-2"
        >
          Continue shopping
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div className="space-y-4">
          {items.map((item) => {
            const unitPrice = parseFoodPrice(item.food.price);
            const lineTotal = unitPrice * item.quantity;

            return (
              <article
                key={item.food.id}
                className="grid gap-4 rounded-lg border border-[#D8CDBB] bg-[#FAF7EF] p-4 shadow-sm sm:grid-cols-[128px_minmax(0,1fr)]"
              >
                <Link
                  href={`/${item.food.slug}`}
                  className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#EFE7D8] focus:outline-none focus:ring-2 focus:ring-[#6E7A5E] focus:ring-offset-2"
                >
                  <Image
                    src={item.food.image.url}
                    alt={item.food.image.alt}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </Link>

                <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto]">
                  <div>
                    <Link
                      href={`/${item.food.slug}`}
                      className="focus:outline-none focus:ring-2 focus:ring-[#6E7A5E] focus:ring-offset-2"
                    >
                      <h2 className="text-xl font-bold text-[#2B241E]">
                        {item.food.title}
                      </h2>
                    </Link>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#62584B]">
                      {item.food.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.food.categories.map((category) => (
                        <span
                          key={category}
                          className="rounded-md bg-[#EFE7D8] px-2 py-1 text-xs font-semibold uppercase tracking-wide text-[#6E4F35]"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 md:min-w-48 md:items-end">
                    <div className="text-left md:text-right">
                      <p className="text-sm font-semibold text-[#62584B]">
                        {currencyFormatter.format(unitPrice)} each
                      </p>
                      <p className="mt-1 text-lg font-bold text-[#2B241E]">
                        {currencyFormatter.format(lineTotal)}
                      </p>
                    </div>

                    <div className="grid h-10 w-36 grid-cols-[2.5rem_minmax(2.5rem,1fr)_2.5rem] overflow-hidden rounded-md border border-[#8A6F4D] bg-[#FFFDF7] text-[#2B241E] shadow-sm">
                      <button
                        type="button"
                        onClick={() => decreaseItem(item.food.id)}
                        className="inline-flex h-full items-center justify-center transition hover:bg-[#EFE7D8] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6E7A5E]"
                        aria-label={
                          item.quantity === 1
                            ? `Remove ${item.food.title} from cart`
                            : `Decrease ${item.food.title} quantity`
                        }
                      >
                        <Minus className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <span className="inline-flex h-full items-center justify-center border-x border-[#D8CDBB] bg-[#D9C7A7] px-3 text-sm font-bold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => addItem(item.food)}
                        className="inline-flex h-full items-center justify-center transition hover:bg-[#EFE7D8] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6E7A5E]"
                        aria-label={`Increase ${item.food.title} quantity`}
                      >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.food.id)}
                      className="inline-flex h-9 w-fit items-center justify-center gap-2 rounded-md px-3 text-sm font-semibold text-[#8A3F2E] transition hover:bg-[#EFE7D8] focus:outline-none focus:ring-2 focus:ring-[#6E7A5E] focus:ring-offset-2"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="rounded-lg border border-[#D8CDBB] bg-[#FFFDF7] p-6 shadow-sm lg:sticky lg:top-28">
          <h2 className="text-2xl font-bold text-[#2B241E]">Order summary</h2>
          <dl className="mt-6 space-y-4 text-sm text-[#4F463B]">
            <div className="flex items-center justify-between gap-4">
              <dt>Items</dt>
              <dd className="font-semibold text-[#2B241E]">{totalQuantity}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt>Subtotal</dt>
              <dd className="font-semibold text-[#2B241E]">
                {currencyFormatter.format(subtotal)}
              </dd>
            </div>
            {/* <div className="flex items-center justify-between gap-4">
              <dt>Estimated tax</dt>
              <dd className="font-semibold text-[#2B241E]">
                {currencyFormatter.format(estimatedTax)}
              </dd>
            </div> */}
            <div className="flex items-center justify-between gap-4 border-t border-[#D8CDBB] pt-4 text-base">
              <dt className="font-bold text-[#2B241E]">Estimated total</dt>
              <dd className="font-bold text-[#2B241E]">
                {currencyFormatter.format(estimatedTotal)}
              </dd>
            </div>
          </dl>

          <Link
            href="/checkout"
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-[#D9C7A7] px-5 text-base font-semibold text-[#2B241E] transition hover:bg-[#CBB58F] focus:outline-none focus:ring-2 focus:ring-[#6E7A5E] focus:ring-offset-2"
          >
            Checkout
          </Link>
          <p className="mt-4 text-sm leading-6 text-[#62584B]">
            Delivery, pickup window, and final taxes are confirmed during checkout.
          </p>
        </aside>
      </div>
    </section>
  );
}

function parseFoodPrice(price: string) {
  const value = Number.parseFloat(price.replace(/[^0-9.]/g, ""));

  return Number.isFinite(value) ? value : 0;
}
