import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function CartPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-12 text-center">
      <ShoppingCart className="h-12 w-12 text-gray-700" aria-hidden="true" />
      <h1 className="mt-5 text-4xl font-bold text-gray-950">Your cart is empty</h1>
      <p className="mt-4 max-w-xl text-gray-700">
        Add a Savory Base favorite from the foods collection and it will appear here.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-gray-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-950"
      >
        Browse Foods
      </Link>
    </section>
  );
}
