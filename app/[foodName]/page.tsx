import { notFound } from "next/navigation";
import { FoodDetail } from "@/components/food-detail";
import { getFoodBySlug, getFoods } from "@/lib/cms";

interface FoodDetailPageProps {
  params: Promise<{
    foodName: string;
  }>;
}

export async function generateStaticParams() {
  const foods = await getFoods();
  return foods.map((food) => ({ foodName: food.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: FoodDetailPageProps) {
  const { foodName } = await params;
  const food = await getFoodBySlug(foodName);

  if (!food) {
    notFound();
  }

  return {
    title: `${food.title} | Savory Base`
  };
}

export default async function FoodDetailPage({ params }: FoodDetailPageProps) {
  const { foodName } = await params;
  const food = await getFoodBySlug(foodName);

  if (!food) {
    notFound();
  }

  return <FoodDetail foodName={foodName} />;
}
