import Link from "next/link";

export function Footer() {
  return (
    <footer id="footer" className="border-t border-[#6E7A5E] bg-[#3F4A36] text-[#FAF7EF]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.35fr_0.9fr_0.9fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="text-xl font-bold">
            Savory Base
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-[#E9DDC8]">
            Filipino-inspired prepared meals, pantry favorites, and ready-to-enjoy foods made for memorable meals.
          </p>
          <p className="mt-4 text-sm leading-6 text-[#E9DDC8]">
            214 E Roosevelt St, Phoenix, AZ 85004
            <br />
            hello@savorybase.com
            <br />
            (602) 555-0188
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#C7D3B5]">
            Shop
          </h2>
          <div className="mt-3 flex flex-col gap-2 text-sm text-[#E9DDC8]">
            <Link href="/" className="transition hover:text-[#FFFDF7]">
              Shop/Menu
            </Link>
            <Link href="/#featured" className="transition hover:text-[#FFFDF7]">
              Featured
            </Link>
            {/* <Link href="/deals" className="transition hover:text-[#FFFDF7]">
              Deals
            </Link> */}
          </div>
        </div>

        {/* <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#C7D3B5]">
            Hours
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#E9DDC8]">
            Monday-Friday: 10 AM-8 PM
            <br />
            Saturday: 11 AM-9 PM
            <br />
            Sunday: 11 AM-6 PM
          </p>
        </div> */}

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#C7D3B5]">
            Policies
          </h2>
          <div className="mt-3 flex flex-col gap-2 text-sm text-[#E9DDC8]">
            <Link href="/faq" className="transition hover:text-[#FFFDF7]">
              FAQs
            </Link>
            <Link href="/refund-policy" className="transition hover:text-[#FFFDF7]">
              Return/Refund Policy
            </Link>
            <Link href="/terms" className="transition hover:text-[#FFFDF7]">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
