// "use client";

// import { useEffect, useState } from "react";
// import type { FoodProduct } from "@/lib/types";
// import { ProductCard } from "@/components/product-card";

// type MenuStatus = "idle" | "loading" | "success" | "error";

// interface FoodsApiResponse {
//   foods?: FoodProduct[];
// }

// interface ProductGridProps {
//   selectedCategory: string | null;
//   onClearCategory: () => void;
// }

// export function ProductGrid({ selectedCategory, onClearCategory }: ProductGridProps) {
//   const [foods, setFoods] = useState<FoodProduct[]>([]);
//   const [status, setStatus] = useState<MenuStatus>("idle");
//   const activeFoods = foods.filter(isActiveFood);
//   const filteredFoods = selectedCategory
//     ? activeFoods.filter((food) => foodMatchesCategory(food, selectedCategory))
//     : activeFoods;

//   useEffect(() => {
//     let isMounted = true;

//     async function fetchFoods() {
//       setStatus("loading");

//       try {
//         const response = await fetch("/api/foods", {
//           method: "GET",
//           headers: {
//             Accept: "application/json"
//           }
//         });

//         if (!response.ok) {
//           throw new Error(`Unable to load menu: ${response.status}`);
//         }

//         const payload = (await response.json()) as FoodsApiResponse | FoodProduct[];
//         const nextFoods = Array.isArray(payload) ? payload : payload.foods ?? [];

//         if (isMounted) {
//           setFoods(nextFoods);
//           setStatus("success");
//         }
//       } catch (error) {
//         console.error(error);

//         if (isMounted) {
//           setStatus("error");
//         }
//       }
//     }

//     fetchFoods();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   return (
//     <section id="featured" className="py-14" aria-label="Featured and best-selling foods">
//       <ProductGridHeader
//         selectedCategory={selectedCategory}
//         onClearCategory={onClearCategory}
//       />
//       <ProductGridContent
//         foods={filteredFoods}
//         status={status}
//         selectedCategory={selectedCategory}
//       />
//     </section>
//   );
// }

// function ProductGridHeader({
//   selectedCategory,
//   onClearCategory
// }: {
//   selectedCategory: string | null;
//   onClearCategory: () => void;
// }) {
//   return (
//     <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
//       <div>
//         <p className="text-sm font-semibold uppercase tracking-wide text-[#6E7A5E]">
//           Featured & Best-Selling
//         </p>
//         <h2 className="mt-2 text-3xl font-bold text-[#2B241E] sm:text-4xl">
//           Trending from the kitchen
//         </h2>
//       </div>
//       <p className="max-w-xl text-sm leading-6 text-[#62584B]">
//         {selectedCategory
//           ? `Showing ${selectedCategory.toLowerCase()} from the live menu.`
//           : "Customer favorites."}
//       </p>
//       {selectedCategory ? (
//         <button
//           type="button"
//           onClick={onClearCategory}
//           className="inline-flex w-fit rounded-md border border-[#8A6F4D] px-4 py-2 text-sm font-semibold text-[#4F463B] transition hover:bg-[#EFE7D8] hover:text-[#2B241E]"
//         >
//           Show all
//         </button>
//       ) : null}
//     </div>
//   );
// }

// function ProductGridContent({
//   foods,
//   status,
//   selectedCategory
// }: {
//   foods: FoodProduct[];
//   status: MenuStatus;
//   selectedCategory: string | null;
// }) {
//   if (status === "loading" || status === "idle") {
//     return (
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {Array.from({ length: 4 }).map((_, index) => (
//           <div
//             key={index}
//             className="h-[360px] animate-pulse rounded-lg border border-[#D8CDBB] bg-[#FAF7EF]"
//           />
//         ))}
//       </div>
//     );
//   }

//   if (status === "error") {
//     return (
//       <div className="rounded-lg border border-[#D8CDBB] bg-[#FAF7EF] p-6 text-sm font-semibold text-[#4F463B]">
//         The menu could not be loaded right now. Please refresh to try again.
//       </div>
//     );
//   }

//   if (foods.length === 0) {
//     return (
//       <div className="rounded-lg border border-[#D8CDBB] bg-[#FAF7EF] p-6 text-sm font-semibold text-[#4F463B]">
//         {selectedCategory
//           ? `No menu items are available for ${selectedCategory.toLowerCase()} yet.`
//           : "No menu items are available yet."}
//       </div>
//     );
//   }

//   return (
//     <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//       {foods.map((food) => (
//         <ProductCard key={food.id} food={food} />
//       ))}
//     </div>
//   );
// }

// function foodMatchesCategory(food: FoodProduct, selectedCategory: string) {
//   const selectedTerms = getCategoryTerms(selectedCategory);
//   const foodCategories = food.categories.map(normalizeCategory);

//   return selectedTerms.some((term) => foodCategories.includes(term));
// }

// function getCategoryTerms(category: string) {
//   const normalized = normalizeCategory(category);
//   const categoryAliases: Record<string, string[]> = {
//     appetizers: ["appetizers", "appetizer"],
//     mains: ["mains", "main", "maincourse"],
//     desserts: ["desserts", "dessert"],
//     beverages: ["beverages", "beverage", "drinks", "drink"]
//   };

//   return categoryAliases[normalized] ?? [normalized];
// }

// function normalizeCategory(category: string) {
//   return category.toLowerCase().replace(/[^a-z0-9]/g, "");
// }

// function isActiveFood(food: FoodProduct) {
//   return food.active === true;
// }
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