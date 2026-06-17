import { slugify } from "@/lib/slug";
import type { FoodProduct, SavoryBaseCmsFood } from "@/lib/types";

export const fallbackFoods: FoodProduct[] = [
  {
    id: "sweet-pork-longganisa",
    title: "Sweet Pork Longganisa",
    slug: "sweet-pork-longganisa",
    price: "$15.00",
    description:
      "A lb of deliciously sweet Filipino sausage, perfect for breakfast or as a main dish.",
    image: {
      url: "/products/sweet-pork-longganisa.webp",
      alt: "A lb of sweet pork longganisa with garlic and spices"
    },
    categories: ["main course", "pork"]
  },
  {
    id: "savory-vigan-longganisa",
    title: "Savory Vigan Longganisa",
    slug: "savory-vigan-longganisa",
    price: "$15.00",
    description:
      "A lb of savory and garlicky Filipino sausage inspired by the flavors of Vigan, ideal for breakfast or as a flavorful addition to any meal.",
    image: {
      url: "/products/savory-vigan-longganisa.webp",
      alt: "A lb of savory Vigan longganisa with garlic and spices"
    },
    categories: ["main course", "pork"]
  },
  {
    id: "meaty-pork-embutido",
    title: "Meaty Pork Embutido",
    slug: "meaty-pork-embutido",
    price: "$8.00",
    description:
      "One loaf of meaty pork sausage, perfect for any meal.",
    image: {
      url: "/products/meaty-pork-embutido.webp",
      alt: "A loaf of meaty pork embutido with garlic and spices"
    },
    categories: ["main course", "pork"]
  },
  {
    id: "tangy-garlicy-pork-tapa",
    title: "Tangy Garlicy Pork Tapa",
    slug: "tangy-garlicy-pork-tapa",
    price: "$15.00",
    description:
      "A lb of tangy and garlicky Filipino cured pork, perfect for breakfast or as a flavorful addition to any meal.",
    image: {
      url: "/products/tangy-garlicy-pork-tapa.webp",
      alt: "A lb of tangy garlicy pork tapa with garlic and spices"
    },
    categories: ["main course", "pork"]
  },
  {
    id: "sweet-chicken-tocino",
    title: "Sweet Chicken Tocino",
    slug: "sweet-chicken-tocino",
    price: "$15.00",
    description:
      "A lb of flavorful and sweet Filipino chicken dish, perfect for breakfast or as a savory addition to any meal.",
    image: {
      url: "/products/sweet-chicken-tocino.webp",
      alt: "A lb of flavorful sweet chicken tocino with garlic and herbs"
    },
    categories: ["main course", "chicken"]
  },
  {
    id: "sweet-pork-tocino",
    title: "Sweet Pork Tocino",
    slug: "sweet-pork-tocino",
    price: "$15.00",
    description:
      "A lb of flavorful and sweet Filipino pork dish, perfect for breakfast or as a savory addition to any meal.",
    image: {
      url: "/products/sweet-pork-tocino.webp",
      alt: "A lb of flavorful sweet pork tocino with garlic and herbs"
    },
    categories: ["main course", "pork"]
  },
  {
    id: "flavorful-umami-pork-siomai",
    title: "Flavorful Umami Pork Siomai",
    slug: "flavorful-umami-pork-siomai",
    price: "$10.00",
    description:
      "A dozen of flavorful and ready-to-cook Filipino pork siomai, perfect for breakfast or as a savory addition to any meal, or as a snack.",
    image: {
      url: "/products/flavorful-umami-pork-siomai.webp",
      alt: "A dozen of flavorful umami pork siomai."
    },
    categories: ["main course", "pork"]
  },
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
    // if (Array.isArray(payload.data)) {
    //   return payload.data.map((item) => {
    //     if (isRecord(item) && isRecord(item.attributes)) {
    //       return { id: item.id as string | number | undefined, ...item.attributes };
    //     }

    //     return item as SavoryBaseCmsFood;
    //   });
    // }

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
    categories: item.categories ?? [],
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