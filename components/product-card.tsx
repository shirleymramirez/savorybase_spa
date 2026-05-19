import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { FoodProduct } from "@/lib/types";

interface ProductCardProps {
  food: FoodProduct;
}

export function ProductCard({ food }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-gray-50 shadow-sm transition hover:-translate-y-1 hover:border-gray-600 hover:shadow-md">
      <Link
        href={`/${food.slug}`}
        className="block focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
      >
        <div className="relative aspect-[4/3] bg-gray-200">
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
            className="focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
          >
            <h2 className="text-lg font-bold leading-6 text-gray-950">{food.title}</h2>
          </Link>
          <p className="shrink-0 text-base font-semibold text-gray-800">
            {food.price}
          </p>
        </div>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-gray-600">
          {food.description}
        </p>
        <button
          type="button"
          className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-gray-800 px-4 text-sm font-semibold text-white transition hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add to Cart
        </button>
      </div>
    </article>
  );
}
