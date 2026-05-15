import { HeaderSection } from "@/components/header-section";
import { ProductGrid } from "@/components/product-grid";
import { getFoods } from "@/lib/cms";

export default async function Home() {
  const foods = await getFoods();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <HeaderSection />
      <ProductGrid foods={foods} />
    </div>
  );
}
