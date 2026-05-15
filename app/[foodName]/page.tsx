import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { getFoodBySlug, getFoods } from "@/lib/cms";

interface FoodDetailPageProps {
  params: Promise<{
    foodName: string;
  }>;
}

export async function generateStaticParams() {
  const foods = await getFoods();

  return foods.map((food) => ({
    foodName: food.slug
  }));
}

export async function generateMetadata({ params }: FoodDetailPageProps) {
  const { foodName } = await params;
  const food = await getFoodBySlug(foodName);

  if (!food) {
    return {
      title: "Food not found | Savory Base"
    };
  }

  return {
    title: `${food.title} | Savory Base`,
    description: food.description
  };
}

export default async function FoodDetailPage({ params }: FoodDetailPageProps) {
  const { foodName } = await params;
  const food = await getFoodBySlug(foodName);

  if (!food) {
    notFound();
  }

  return (
    <article className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:px-8 lg:py-14">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-200 shadow-sm">
        <Image
          src={food.image.url}
          alt={food.image.alt}
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center">
        <Link
          href="/"
          className="mb-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-gray-950"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Foods
        </Link>

        <p className="text-sm font-semibold uppercase tracking-wide text-gray-600">
          Savory Base
        </p>
        <h1 className="mt-3 text-4xl font-bold text-gray-950 sm:text-5xl">
          {food.title}
        </h1>
        <p className="mt-5 text-3xl font-semibold text-gray-800">
          {food.price}
        </p>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-700">
          {food.description}
        </p>

        <button className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gray-800 px-6 py-3 text-base font-semibold text-white transition hover:bg-gray-950 sm:w-fit">
          <ShoppingCart className="h-5 w-5" aria-hidden="true" />
          Add to Cart
        </button>
      </div>
    </article>
  );
}
