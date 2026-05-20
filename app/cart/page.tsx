import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function CartPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-12 text-center">
      <ShoppingCart className="h-12 w-12 text-[#6E7A5E]" aria-hidden="true" />
      <h1 className="mt-5 text-4xl font-bold text-[#2B241E]">Your cart is empty</h1>
      <p className="mt-4 max-w-xl text-[#4F463B]">
        Add a Savory Base favorite from the foods collection and it will appear here.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-[#D9C7A7] px-5 py-3 text-sm font-semibold text-[#2B241E] transition hover:bg-[#CBB58F]"
      >
        Browse Foods
      </Link>
    </section>
  );
}
