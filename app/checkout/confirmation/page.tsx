import Link from "next/link";
import { CheckCircle2, ShoppingBag } from "lucide-react";

export default function CheckoutConfirmationPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <CheckCircle2 className="h-14 w-14 text-[#6E7A5E]" aria-hidden="true" />
      <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#6E7A5E]">Order confirmed</p>
      <h1 className="mt-3 text-4xl font-bold text-[#2B241E]">Thank you for your purchase</h1>
      <p className="mt-4 max-w-xl text-[#4F463B]">
        Your order has been placed successfully. A confirmation email with tracking details will be sent shortly.
      </p>
      <div className="mt-6 rounded-lg border border-[#D8CDBB] bg-[#FFFDF7] px-5 py-4 text-sm text-[#2B241E] shadow-sm">
        Order reference: SB-2026-0812-001
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-md bg-[#D9C7A7] px-5 text-sm font-semibold text-[#2B241E] transition hover:bg-[#CBB58F] focus:outline-none focus:ring-2 focus:ring-[#6E7A5E] focus:ring-offset-2"
        >
          Continue shopping
        </Link>
        <Link
          href="/cart"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#8A6F4D] px-5 text-sm font-semibold text-[#4F463B] transition hover:bg-[#EFE7D8] focus:outline-none focus:ring-2 focus:ring-[#6E7A5E] focus:ring-offset-2"
        >
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          Return to cart
        </Link>
      </div>
    </main>
  );
}
