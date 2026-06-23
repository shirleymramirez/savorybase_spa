import { HeroSection } from "@/components/hero-section";
import { ProductGrid } from "@/components/product-grid";
import { getFoods } from "@/lib/cms";

export default async function Home() {
  const foods = await getFoods();

  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <ProductGrid foods={foods} />
      </div>
    </section>
  );
}
