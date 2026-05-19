import Link from "next/link";

export default function DealsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-600">
        Deals
      </p>
      <h1 className="mt-3 text-4xl font-bold text-gray-950">Today&apos;s offers</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {["15% off family bundles", "Free delivery over $35"].map((deal) => (
          <div key={deal} className="rounded-lg border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-xl font-bold text-gray-950">{deal}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Add qualifying items to your cart and the offer will be reflected at
              checkout.
            </p>
          </div>
        ))}
      </div>
      <Link
        href="/#featured"
        className="mt-8 inline-flex rounded-md bg-gray-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-950"
      >
        Shop the Menu
      </Link>
    </main>
  );
}
