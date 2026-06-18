import Link from "next/link";
import Image from "next/image";

const heroSlides = [
  {
    src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1800&q=85",
    alt: "A colorful spread of fresh vegetables and prepared dishes"
  },
  {
    src: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1800&q=85",
    alt: "A warm bowl of soup with fresh herbs"
  },
  {
    src: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1800&q=85",
    alt: "A bright market salad with citrus and greens"
  }
];

export function HeaderSection() {
  return (
    // <section className="pb-8 pt-2 sm:pb-10">
    //   <p className="text-sm font-semibold uppercase tracking-wide text-[#6E7A5E]">
    //     Storefront
    //   </p>
    //   <h1 className="mt-3 text-4xl font-bold text-[#2B241E] sm:text-6xl">
    //     Filipino Foods
    //   </h1>
    //   <p className="mt-5 max-w-2xl text-lg leading-8 text-[#4F463B]">
    //     Browse flavorful staples, prepared favorites, and meal-ready products from
    //     the Savory Base kitchen.
    //   </p>
    // </section>
    <section className="pb-8 pt-2 sm:pb-10">
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover ${index === 0 ? "opacity-90" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-[#F4F0E6]/45" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-132px)] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#4B5340]">
          Pickup from Chandler or delivery in the Phoenix metro area.
        </p>
        <h1 className="mt-4 max-w-4xl font-bold leading-tight text-4xl lg:text-7xl">Filipino comfort food, ready to cook at home</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#3F382F]">
          Order comforting dishes. We provide ready-to-cook Filipino staples and home-cooked favorites so you can enjoy authentic flavors with ease.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#products"
            className="inline-flex h-12 items-center justify-center rounded-md bg-[#D9C7A7] px-6 text-base font-semibold text-[#2B241E] transition hover:bg-[#CBB58F]"
          >
            Explore the Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
