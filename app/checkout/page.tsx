"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, MapPin, ShieldCheck } from "lucide-react";
import { useCart } from "@/components/cart-provider";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

export default function CheckoutPage() {
  const { items } = useCart();
  const router = useRouter();
  const [shippingMethod, setShippingMethod] = useState("standard");

  const [email, setEmail] = useState("guest@example.com");
  const [phone, setPhone] = useState("(555) 012-3456");
  const [recipientName, setRecipientName] = useState("Jordan Rivera");
  const [deliveryAddress, setDeliveryAddress] = useState("123 Market Street, Suite 400, San Francisco, CA 94105");
  const [message, setMessage] = useState("");

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + parseFoodPrice(item.food.price) * item.quantity,
        0
      ),
    [items]
  );
  const shipping = subtotal > 0 ? (shippingMethod === "express" ? 12.99 : 6.99) : 0;
  const tax = subtotal * 0.086;
  // const grandTotal = subtotal + shipping + tax;
  const grandTotal = subtotal;

  if (items.length === 0) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
        <ShieldCheck className="h-12 w-12 text-[#6E7A5E]" aria-hidden="true" />
        <h1 className="mt-5 text-4xl font-bold text-[#2B241E]">Your checkout is ready once you add items</h1>
        <p className="mt-4 max-w-xl text-[#4F463B]">
          Add something delicious to your cart and come back here to finalize your order.
        </p>
        <Link
          href="/cart"
          className="mt-8 rounded-md bg-[#D9C7A7] px-5 py-3 text-sm font-semibold text-[#2B241E] transition hover:bg-[#CBB58F] focus:outline-none focus:ring-2 focus:ring-[#6E7A5E] focus:ring-offset-2"
        >
          Back to cart
        </Link>
      </main>
    );
  }

  function handlePlaceOrder() {
    const checkoutData = {
      items,
      customer: { email, phone },
      shippingMethod,
      recipientName,
      deliveryAddress,
      message,
      // totals: { subtotal, shipping, tax, grandTotal }
      totals: { subtotal, shipping: 0, tax: 0, grandTotal }
    };

    try {
      sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    } catch (e) {
      console.error("Failed to save checkout data to sessionStorage", e);
    }

    router.push("/checkout/summary");
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6E7A5E]">Secure checkout</p>
        <h1 className="text-4xl font-bold text-[#2B241E]">Complete your order</h1>
        <p className="max-w-2xl text-[#4F463B]">
          Review the order, add your delivery details, and confirm your payment in a few quick steps.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        <section className="space-y-6">
          <article className="rounded-xl border border-[#D8CDBB] bg-[#FFFDF7] p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-[#6E7A5E]" aria-hidden="true" />
              <h2 className="text-xl font-bold text-[#2B241E]">Customer information</h2>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-[#2B241E]">
                Email address
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-md border border-[#D8CDBB] bg-[#FFFDF7] px-3 text-sm text-[#2B241E] outline-none transition focus:border-[#6E7A5E] focus:ring-2 focus:ring-[#C7D3B5]"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-[#2B241E]">
                Phone number
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-11 rounded-md border border-[#D8CDBB] bg-[#FFFDF7] px-3 text-sm text-[#2B241E] outline-none transition focus:border-[#6E7A5E] focus:ring-2 focus:ring-[#C7D3B5]"
                />
              </label>
            </div>
          </article>

          <article className="rounded-xl border border-[#D8CDBB] bg-[#FFFDF7] p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-[#6E7A5E]" aria-hidden="true" />
              <h2 className="text-xl font-bold text-[#2B241E]">Shipping & fulfillment</h2>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-[#2B241E] sm:col-span-2">
                Recipient name
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="h-11 rounded-md border border-[#D8CDBB] bg-[#FFFDF7] px-3 text-sm text-[#2B241E] outline-none transition focus:border-[#6E7A5E] focus:ring-2 focus:ring-[#C7D3B5]"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-[#2B241E] sm:col-span-2">
                Delivery address
                <textarea
                  rows={3}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="rounded-md border border-[#D8CDBB] bg-[#FFFDF7] px-3 py-3 text-sm text-[#2B241E] outline-none transition focus:border-[#6E7A5E] focus:ring-2 focus:ring-[#C7D3B5]"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-[#2B241E] sm:col-span-2">
                Message
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add a message for the delivery"
                  className="rounded-md border border-[#D8CDBB] bg-[#FFFDF7] px-3 py-3 text-sm text-[#2B241E] outline-none transition focus:border-[#6E7A5E] focus:ring-2 focus:ring-[#C7D3B5]"
                />
              </label>
            </div>
          </article>

          <article className="rounded-xl border border-[#D8CDBB] bg-[#FFFDF7] p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-[#6E7A5E]" aria-hidden="true" />
              <h2 className="text-xl font-bold text-[#2B241E]">Payment method</h2>
            </div>
            <p className="mt-2 text-sm text-[#62584B]">Payment can be made with any of the following methods:</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {['Cash', 'Zelle', 'Apple Pay', 'Google Pay'].map((method) => (
                <span
                  key={method}
                  className="rounded-full border border-[#D8CDBB] bg-[#FAF7EF] px-3 py-2 text-sm font-semibold text-[#4F463B]"
                >
                  {method}
                </span>
              ))}
            </div>
          </article>
        </section>

        <aside className="rounded-xl border border-[#D8CDBB] bg-[#FFFDF7] p-6 shadow-sm lg:sticky lg:top-28">
          <h2 className="text-2xl font-bold text-[#2B241E]">Order summary</h2>
          <ul className="mt-5 space-y-4 text-sm text-[#4F463B]">
            {items.map((item) => {
              const unitPrice = parseFoodPrice(item.food.price);
              return (
                <li key={item.food.id} className="flex items-start justify-between gap-4 rounded-md bg-[#FAF7EF] p-3">
                  <div>
                    <p className="font-semibold text-[#2B241E]">{item.food.title}</p>
                    <p className="text-xs uppercase tracking-wide text-[#6E7A5E]">Qty {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-[#2B241E]">{currencyFormatter.format(unitPrice * item.quantity)}</span>
                </li>
              );
            })}
          </ul>

          <dl className="mt-6 space-y-3 text-sm text-[#4F463B]">
            <div className="flex items-center justify-between gap-4">
              <dt>Subtotal</dt>
              <dd className="font-semibold text-[#2B241E]">{currencyFormatter.format(subtotal)}</dd>
            </div>
            {/* <div className="flex items-center justify-between gap-4">
              <dt>Shipping</dt>
              <dd className="font-semibold text-[#2B241E]">{currencyFormatter.format(shipping)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt>Taxes</dt>
              <dd className="font-semibold text-[#2B241E]">{currencyFormatter.format(tax)}</dd>
            </div> */}
            <div className="flex items-center justify-between gap-4 border-t border-[#D8CDBB] pt-4 text-base">
              <dt className="font-bold text-[#2B241E]">Grand total</dt>
              <dd className="font-bold text-[#2B241E]">{currencyFormatter.format(grandTotal)}</dd>
            </div>
          </dl>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-[#D9C7A7] px-5 text-base font-semibold text-[#2B241E] transition hover:bg-[#CBB58F] focus:outline-none focus:ring-2 focus:ring-[#6E7A5E] focus:ring-offset-2"
          >
            Place order
          </button>
          <p className="mt-3 text-xs text-[#62584B]">By placing your order, you agree to our secure checkout terms and delivery policies.</p>
        </aside>
      </div>
    </main>
  );
}

function parseFoodPrice(price: string) {
  const value = Number.parseFloat(price.replace(/[^0-9.]/g, ""));

  return Number.isFinite(value) ? value : 0;
}
