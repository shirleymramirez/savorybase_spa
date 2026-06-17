import Image from "next/image";
import Link from "next/link";
import type { FoodProduct } from "@/lib/types";
import { AddToCartButton } from "@/components/add-to-cart-button";

interface ProductCardProps {
  food: FoodProduct;
}

export function ProductCard({ food }: ProductCardProps) {
  console.log("ProductCard render", { food });
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#D8CDBB] bg-[#FAF7EF] shadow-sm transition hover:-translate-y-1 hover:border-[#8A6F4D] hover:shadow-md">
      <Link
        href={`/${food.slug}`}
        className="block focus:outline-none focus:ring-2 focus:ring-[#6E7A5E] focus:ring-offset-2"
      >
        <div className="relative aspect-[4/3] bg-[#EFE7D8]">
          <Image
            src={food.image.url}
            alt={food.image.alt}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <Link
            href={`/${food.slug}`}
            className="focus:outline-none focus:ring-2 focus:ring-[#6E7A5E] focus:ring-offset-2"
          >
            <h2 className="text-lg font-bold leading-6 text-[#2B241E]">{food.title}</h2>
          </Link>
          <p className="shrink-0 text-base font-semibold text-[#6E4F35]">
            {food.price}
          </p>
        </div>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-[#62584B]">
          {food.description}
        </p>
        <AddToCartButton food={food} />
      </div>
    </article>
  );
}
