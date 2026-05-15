import Link from "next/link";

export function Footer() {
  return (
    <footer id="footer" className="border-t border-gray-300 bg-gray-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="text-xl font-bold">
            Savory Base
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-gray-300">
            Curated pantry favorites and ready-to-enjoy foods made for memorable meals.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Shop
          </h2>
          <div className="mt-3 flex flex-col gap-2 text-sm text-gray-300">
            <Link href="/" className="transition hover:text-white">
              Foods
            </Link>
            <Link href="/#featured" className="transition hover:text-white">
              Featured
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Contact
          </h2>
          <p className="mt-3 text-sm leading-6 text-gray-300">
            hello@savorybase.com
            <br />
            Phoenix, Arizona
          </p>
        </div>
      </div>
    </footer>
  );
}
