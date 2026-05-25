"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { FoodProduct } from "@/lib/types";
import { AddToCartButton } from "@/components/add-to-cart-button";

type DetailStatus = "idle" | "loading" | "success" | "error";

interface FoodsApiResponse {
  foods?: FoodProduct[];
}

interface FoodDetailProps {
  foodName: string;
}

export function FoodDetail({ foodName }: FoodDetailProps) {
  const [food, setFood] = useState<FoodProduct | null>(null);
  const [status, setStatus] = useState<DetailStatus>("idle");

  useEffect(() => {
    let isMounted = true;

    async function fetchFood() {
      setStatus("loading");

      try {
        const response = await fetch("/api/foods", {
          method: "GET",
          headers: {
            Accept: "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`Unable to load food: ${response.status}`);
        }

        const payload = (await response.json()) as FoodsApiResponse | FoodProduct[];
        const foods = Array.isArray(payload) ? payload : payload.foods ?? [];
        const nextFood = foods.find((item) => item.slug === foodName) ?? null;

        if (isMounted) {
          setFood(nextFood);
          setStatus("success");
        }
      } catch (error) {
        console.error(error);

        if (isMounted) {
          setStatus("error");
        }
      }
    }

    fetchFood();

    return () => {
      isMounted = false;
    };
  }, [foodName]);

  if (status === "loading" || status === "idle") {
    return (
      <article className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:px-8 lg:py-14">
        <div className="aspect-[4/3] animate-pulse rounded-lg bg-[#EFE7D8]" />
        <div className="flex flex-col justify-center gap-4">
          <div className="h-5 w-32 animate-pulse rounded bg-[#D8CDBB]" />
          <div className="h-12 w-3/4 animate-pulse rounded bg-[#D8CDBB]" />
          <div className="h-8 w-24 animate-pulse rounded bg-[#D8CDBB]" />
          <div className="h-24 w-full max-w-2xl animate-pulse rounded bg-[#D8CDBB]" />
        </div>
      </article>
    );
  }

  if (status === "error" || !food) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold text-[#2B241E]">Food not found</h1>
        <p className="mt-4 text-[#4F463B]">
          The item you are looking for is no longer available in this storefront.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-md bg-[#D9C7A7] px-5 py-3 text-sm font-semibold text-[#2B241E] transition hover:bg-[#CBB58F]"
        >
          Browse Foods
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:px-8 lg:py-14">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#EFE7D8] shadow-sm">
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
          className="mb-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#6E7A5E] transition hover:text-[#2B241E]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Foods
        </Link>

        <p className="text-sm font-semibold uppercase tracking-wide text-[#6E7A5E]">
          Savory Base
        </p>
        <h1 className="mt-3 text-4xl font-bold text-[#2B241E] sm:text-5xl">
          {food.title}
        </h1>
        <p className="mt-5 text-3xl font-semibold text-[#6E4F35]">{food.price}</p>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4F463B]">
          {food.description}
        </p>

        <AddToCartButton food={food} size="detail" />
      </div>
    </article>
  );
}
