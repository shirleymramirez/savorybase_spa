import type { FoodProduct } from "@/lib/types";
import { ProductCard } from "@/components/product-card";

interface ProductGridProps {
  foods: FoodProduct[];
}

export function ProductGrid({ foods }: ProductGridProps) {
  return (
    <section id="featured" className="py-14" aria-label="Featured and best-selling foods">
      <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#6E7A5E]">
            Featured & Best-Selling
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#2B241E] sm:text-4xl">
            Trending from the kitchen
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-[#62584B]">
          Customer favorites with quick add-to-cart actions for fast weekday ordering.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {foods.map((food) => (
          <ProductCard key={food.id} food={food} />
        ))}
      </div>
    </section>
  );
}
