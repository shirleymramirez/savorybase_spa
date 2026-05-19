import Link from "next/link";

export function Footer() {
  return (
    <footer id="footer" className="border-t border-gray-300 bg-gray-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.35fr_0.9fr_0.9fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="text-xl font-bold">
            Savory Base
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-gray-300">
            Filipino-inspired prepared meals, pantry favorites, and ready-to-enjoy foods made for memorable meals.
          </p>
          <p className="mt-4 text-sm leading-6 text-gray-300">
            214 E Roosevelt St, Phoenix, AZ 85004
            <br />
            hello@savorybase.com
            <br />
            (602) 555-0188
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Shop
          </h2>
          <div className="mt-3 flex flex-col gap-2 text-sm text-gray-300">
            <Link href="/" className="transition hover:text-white">
              Shop/Menu
            </Link>
            <Link href="/#featured" className="transition hover:text-white">
              Featured
            </Link>
            <Link href="/deals" className="transition hover:text-white">
              Deals
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Hours
          </h2>
          <p className="mt-3 text-sm leading-6 text-gray-300">
            Monday-Friday: 10 AM-8 PM
            <br />
            Saturday: 11 AM-9 PM
            <br />
            Sunday: 11 AM-6 PM
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Policies
          </h2>
          <div className="mt-3 flex flex-col gap-2 text-sm text-gray-300">
            <Link href="/faq" className="transition hover:text-white">
              FAQs
            </Link>
            <Link href="/refund-policy" className="transition hover:text-white">
              Return/Refund Policy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
