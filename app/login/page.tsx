export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-950">Profile Login</h1>
      <p className="mt-4 text-gray-700">
        Sign in to save delivery addresses, reorder favorites, and review past orders.
      </p>
      <form className="mt-8 grid gap-4">
        <input
          type="email"
          placeholder="Email address"
          className="h-11 rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-gray-700 focus:ring-2 focus:ring-gray-300"
        />
        <button
          type="button"
          className="h-11 rounded-md bg-gray-800 text-sm font-semibold text-white transition hover:bg-gray-950"
        >
          Continue
        </button>
      </form>
    </main>
  );
}
