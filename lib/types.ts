export interface FoodImage {
  url: string;
  alt: string;
}

export interface FoodProduct {
  id: string;
  title: string;
  slug: string;
  price: string;
  description: string;
  image: FoodImage;
}

export interface SavoryBaseApiFood {
  id?: string | number;
  _id?: string | number;
  title?: string;
  name?: string;
  foodName?: string;
  slug?: string;
  price?: string | number;
  description?: string;
  categories?: string[];
  image?: string | FoodImage | { url?: string; alt?: string; alternativeText?: string };
  productImage?: string | FoodImage | { url?: string; alt?: string; alternativeText?: string };
  imageUrl?: string;
}
