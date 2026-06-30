import type { FoodProduct } from "@/lib/types";
import { ProductCard } from "@/components/product-card";

interface ProductGridProps {
  foods: FoodProduct[];
}

export function ProductGrid({ foods }: ProductGridProps) {
  return (
    <section id="products" aria-label="Food products">
      <div>
         <p className="text-sm font-semibold uppercase tracking-wide text-[#6E7A5E]">
          Featured & Best-Selling
        </p>
        <h1 className="mt-4 mb-4 max-w-4xl text-4xl font-bold leading-tight lg:text-6xl">Mga Paboritong Ulam</h1>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {foods.map((food) => (
          <ProductCard key={food.id} food={food} />
        ))}
      </div>
    </section>
    
  );
}