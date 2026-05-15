import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-950">Food not found</h1>
      <p className="mt-4 text-gray-700">
        The item you are looking for is no longer available in this storefront.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-gray-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-950"
      >
        Browse Foods
      </Link>
    </div>
  );
}
