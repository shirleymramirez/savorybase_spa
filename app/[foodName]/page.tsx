import { FoodDetail } from "@/components/food-detail";

interface FoodDetailPageProps {
  params: Promise<{
    foodName: string;
  }>;
}

export async function generateMetadata({ params }: FoodDetailPageProps) {
  const { foodName } = await params;

  return {
    title: `${foodName.replaceAll("-", " ")} | Savory Base`
  };
}

export default async function FoodDetailPage({ params }: FoodDetailPageProps) {
  const { foodName } = await params;
  return <FoodDetail foodName={foodName} />;
}
