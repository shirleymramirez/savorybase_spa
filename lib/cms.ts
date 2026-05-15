import { slugify } from "@/lib/slug";
import type { FoodProduct, SavoryBaseCmsFood } from "@/lib/types";

const fallbackFoods: FoodProduct[] = [
  {
    id: "roasted-tomato-bisque",
    title: "Roasted Tomato Bisque",
    slug: "roasted-tomato-bisque",
    price: "$12.00",
    description:
      "Slow-roasted tomatoes blended with herbs, cream, and a bright finish for cozy weeknight meals.",
    image: {
      url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80",
      alt: "A bowl of roasted tomato soup with herbs"
    }
  },
  {
    id: "herbed-grain-bowl",
    title: "Herbed Grain Bowl",
    slug: "herbed-grain-bowl",
    price: "$14.50",
    description:
      "A hearty mix of grains, roasted vegetables, lemon herbs, and savory dressing.",
    image: {
      url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
      alt: "A colorful bowl of grains and vegetables"
    }
  },
  {
    id: "golden-chickpea-stew",
    title: "Golden Chickpea Stew",
    slug: "golden-chickpea-stew",
    price: "$13.00",
    description:
      "Tender chickpeas simmered with turmeric, garlic, greens, and warming spices.",
    image: {
      url: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=1200&q=80",
      alt: "A pot of golden chickpea stew"
    }
  },
  {
    id: "citrus-market-salad",
    title: "Citrus Market Salad",
    slug: "citrus-market-salad",
    price: "$11.75",
    description:
      "Crisp greens, citrus, shaved vegetables, toasted seeds, and a clean vinaigrette.",
    image: {
      url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
      alt: "A fresh market salad with citrus"
    }
  }
];

export async function getFoods(): Promise<FoodProduct[]> {
  const cmsUrl = process.env.SAVORY_BASE_CMS_URL;

  if (!cmsUrl) {
    return fallbackFoods;
  }

  try {
    const response = await fetch(cmsUrl, {
      headers: {
        Accept: "application/json",
        ...(process.env.SAVORY_BASE_CMS_TOKEN
          ? { Authorization: `Bearer ${process.env.SAVORY_BASE_CMS_TOKEN}` }
          : {})
      },
      next: {
        revalidate: 300
      }
    });

    if (!response.ok) {
      throw new Error(`Savory Base CMS responded with ${response.status}`);
    }

    const payload = await response.json();
    const rawFoods = normalizeCollection(payload);
    const foods = rawFoods.map(mapCmsFood).filter(isFoodProduct);

    return foods.length > 0 ? foods : fallbackFoods;
  } catch (error) {
    console.error("Unable to fetch Savory Base CMS foods", error);
    return fallbackFoods;
  }
}

export async function getFoodBySlug(slug: string) {
  const foods = await getFoods();
  return foods.find((food) => food.slug === slug);
}

function normalizeCollection(payload: unknown): SavoryBaseCmsFood[] {
  if (Array.isArray(payload)) {
    return payload as SavoryBaseCmsFood[];
  }

  if (isRecord(payload)) {
    if (Array.isArray(payload.data)) {
      return payload.data.map((item) => {
        if (isRecord(item) && isRecord(item.attributes)) {
          return { id: item.id as string | number | undefined, ...item.attributes };
        }

        return item as SavoryBaseCmsFood;
      });
    }

    if (Array.isArray(payload.foods)) {
      return payload.foods as SavoryBaseCmsFood[];
    }

    if (Array.isArray(payload.products)) {
      return payload.products as SavoryBaseCmsFood[];
    }
  }

  return [];
}

function mapCmsFood(item: SavoryBaseCmsFood): FoodProduct | null {
  const title = item.title ?? item.name ?? item.foodName;

  if (!title) {
    return null;
  }

  const image = normalizeImage(item.image ?? item.productImage, title);
  const slug = item.slug ? slugify(item.slug) : slugify(title);

  return {
    id: String(item.id ?? item._id ?? slug),
    title,
    slug,
    price: formatPrice(item.price),
    description: item.description ?? "A flavorful Savory Base favorite.",
    image
  };
}

function normalizeImage(
  image: SavoryBaseCmsFood["image"],
  title: string
): FoodProduct["image"] {
  if (typeof image === "string") {
    return {
      url: image,
      alt: title
    };
  }

  if (image && typeof image === "object") {
    return {
      url: image.url ?? fallbackFoods[0].image.url,
      alt:
        image.alt ??
        ("alternativeText" in image ? image.alternativeText : undefined) ??
        title
    };
  }

  return {
    url: fallbackFoods[0].image.url,
    alt: title
  };
}

function formatPrice(price: SavoryBaseCmsFood["price"]) {
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
