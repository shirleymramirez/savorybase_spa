"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Customer {
  email: string;
  phone: string;
}

interface FoodItem {
  id: string;
  title: string;
  price: number;
}

interface Item {
  food: FoodItem;
  quantity: number;
}

interface Totals {
  subtotal: number;
  shipping: number;
  tax: number;
  grandTotal: number;
}

interface CheckoutData {
  customer: Customer;
  recipientName: string;
  deliveryAddress: string;
  message: string;
  items: Item[];
  totals: Totals;
}

export default function CheckoutSummaryPage() {
  const router = useRouter();
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("checkoutData");
      if (raw) setCheckoutData(JSON.parse(raw));
      else router.push("/checkout");
    } catch (e) {
      console.error(e);
      router.push("/checkout");
    }
  }, [router]);

  if (!checkoutData) {
    return null;
  }

  async function handleSend() {
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkout: checkoutData })
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(body || "Failed to send order");
      }
      setSent(true);
    } catch (err: unknown) { // Fixed: Changed from 'any' to 'unknown'
      console.error(err);
      // Type safe extraction of error message
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-[#2B241E]">Order summary</h1>
      <p className="mt-2 text-sm text-[#4F463B]">Review your details before sending the order.</p>
      
      <section className="mt-6 rounded-xl border border-[#D8CDBB] bg-[#FFFDF7] p-6">
        <h2 className="text-xl font-semibold text-[#2B241E]">Customer</h2>
        <div className="mt-3 text-sm text-[#4F463B]">
          <div><strong>Email:</strong> {checkoutData.customer.email}</div>
          <div><strong>Phone:</strong> {checkoutData.customer.phone}</div>
        </div>
        
        <h2 className="mt-4 text-xl font-semibold text-[#2B241E]">Recipient & Address</h2>
        <div className="mt-3 text-sm text-[#4F463B]">
          <div><strong>Name:</strong> {checkoutData.recipientName}</div>
          <div><strong>Address:</strong> {checkoutData.deliveryAddress}</div>
          <div><strong>Message:</strong> {checkoutData.message}</div>
        </div>
        
        <h2 className="mt-4 text-xl font-semibold text-[#2B241E]">Items</h2>
        <ul className="mt-3 space-y-2 text-sm text-[#4F463B]">
          {checkoutData.items.map((item) => (
            <li key={item.food.id} className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-[#2B241E]">{item.food.title} x{item.quantity}</div>
                <div className="text-xs text-[#6E7A5E]">{item.food.id}</div>
              </div>
              <div className="font-semibold text-[#2B241E]"> ${Number(item.food.price).toFixed(2)}</div>
            </li>
          ))}
        </ul>
        
        <h2 className="mt-4 text-xl font-semibold text-[#2B241E]">Totals</h2>
        <div className="mt-3 text-sm text-[#4F463B]">
          <div><strong>Subtotal:</strong> ${checkoutData.totals.subtotal.toFixed(2)}</div>
          <div className="mt-2 text-base font-bold"><strong>Grand total:</strong> ${checkoutData.totals.grandTotal.toFixed(2)}</div>
        </div>
        
        <div className="mt-6 flex gap-3">
          <button 
            onClick={handleSend} 
            disabled={sending || sent} 
            className="inline-flex h-12 items-center justify-center rounded-md bg-[#D9C7A7] px-5 text-base font-semibold text-[#2B241E] transition hover:bg-[#CBB58F] disabled:opacity-50"
          >
            {sending ? "Sending…" : sent ? "Sent" : "Send"}
          </button>
          <Link href="/checkout" className="inline-flex h-12 items-center justify-center rounded-md border border-[#D8CDBB] bg-white px-5 text-base font-semibold text-[#2B241E]">
            Edit
          </Link>
        </div>
        
        {error && <p className="mt-4 text-sm text-red-600">Error: {error}</p>}
        {sent && <p className="mt-4 text-sm text-green-700">Order Successfully Sent!</p>}
      </section>
    </main>
  );
}
