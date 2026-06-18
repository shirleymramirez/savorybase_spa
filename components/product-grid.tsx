import type { FoodProduct } from "@/lib/types";
import { ProductCard } from "@/components/product-card";

interface ProductGridProps {
  foods: FoodProduct[];
}

export function ProductGrid({ foods }: ProductGridProps) {
  return (
    <section id="featured" aria-label="Food products">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {foods.map((food) => (
          <ProductCard key={food.id} food={food} />
        ))}
      </div>
    </section>
  );
}