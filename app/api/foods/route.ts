import { NextResponse } from "next/server";
import { slugify } from "@/lib/slug";
import type { FoodImage, FoodProduct, SavoryBaseFood } from "@/lib/types";

export async function GET() {
  try {
    const foods = await fetchFoods();

    return NextResponse.json({ foods });
  } catch (error) {
    console.error("Unable to fetch foods from API", error);

    return NextResponse.json(
      { error: "Unable to fetch foods from API", foods: [] },
      { status: 502 }
    );
  }
}

async function fetchFoods(): Promise<FoodProduct[]> {
  const apiUrl = process.env.SAVORY_BASE_API_URL;

  if (!apiUrl) {
    throw new Error("SAVORY_BASE_API_URL is not configured");
  }

  const response = await fetch(apiUrl, {
    headers: {
      Accept: "application/json",
      ...(process.env.SAVORY_BASE_API_TOKEN
        ? { Authorization: `Bearer ${process.env.SAVORY_BASE_API_TOKEN}` }
        : {})
    },
    next: {
      revalidate: 300
    }
  });

  if (!response.ok) {
    throw new Error(`Foods API responded with ${response.status}`);
  }

  const payload = await response.json();

  return normalizeCollection(payload).map(mapApiFood).filter(isFoodProduct);
}

function normalizeCollection(payload: unknown): SavoryBaseFood[] {
  if (Array.isArray(payload)) {
    return payload as SavoryBaseFood[];
  }

  if (isRecord(payload)) {
    if (isRecord(payload.data)) {
      return [payload.data as SavoryBaseFood];
    }

    if (Array.isArray(payload.foods)) {
      return payload.foods as SavoryBaseFood[];
    }

    if (Array.isArray(payload.products)) {
      return payload.products as SavoryBaseFood[];
    }
  }

  return [];
}

function mapApiFood(item: SavoryBaseFood): FoodProduct | null {
  const title = item.title ?? item.name ?? item.foodName;

  if (!title) {
    return null;
  }

  const image = normalizeImage(item.image ?? item.productImage ?? item.imageUrl, title);
  const slug = item.slug ? slugify(item.slug) : slugify(title);

  if (!image) {
    return null;
  }

  return {
    id: String(item.id ?? item._id ?? slug),
    title,
    slug,
    price: formatPrice(item.price),
    description: item.description ?? "A flavorful Savory Base favorite.",
    categories: item.categories ?? [],
    active: item.active,
    image
  };
}

function normalizeImage(
  image: SavoryBaseFood["image"],
  title: string
): FoodImage | null {
  if (typeof image === "string") {
    return {
      url: image,
      alt: title
    };
  }

  if (image && typeof image === "object") {
    if (!image.url) {
      return null;
    }

    return {
      url: image.url,
      alt:
        image.alt ??
        ("alternativeText" in image ? image.alternativeText : undefined) ??
        title
    };
  }

  return null;
}

function formatPrice(price: SavoryBaseFood["price"]) {
  if (typeof price === "number") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(price);
  }

  return price ?? "$0.00";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isFoodProduct(value: FoodProduct | null): value is FoodProduct {
  return value !== null;
}
