export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-[#2B241E]">Profile Login</h1>
      <p className="mt-4 text-[#4F463B]">
        Sign in to save delivery addresses, reorder favorites, and review past orders.
      </p>
      <form className="mt-8 grid gap-4">
        <input
          type="email"
          placeholder="Email address"
          className="h-11 rounded-md border border-[#D8CDBB] bg-[#FFFDF7] px-3 text-sm outline-none focus:border-[#6E7A5E] focus:ring-2 focus:ring-[#C7D3B5]"
        />
        <button
          type="button"
          className="h-11 rounded-md bg-[#D9C7A7] text-sm font-semibold text-[#2B241E] transition hover:bg-[#CBB58F]"
        >
          Continue
        </button>
      </form>
    </main>
  );
}
