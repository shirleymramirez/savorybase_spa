"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import type { FoodProduct } from "@/lib/types";
import { useCart } from "@/components/cart-provider";

interface AddToCartButtonProps {
  food: FoodProduct;
  size?: "card" | "detail";
}

export function AddToCartButton({ food, size = "card" }: AddToCartButtonProps) {
  const { addItem, decreaseItem, getQuantity } = useCart();
  const quantity = getQuantity(food.id);
  const isDetail = size === "detail";
  const controlClassName = isDetail
    ? "mt-9 h-12 w-full sm:w-fit"
    : "mt-5 h-10 w-full";

  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={() => addItem(food)}
        className={`${controlClassName} inline-flex items-center justify-center gap-2 rounded-md bg-[#D9C7A7] px-4 text-sm font-semibold text-[#2B241E] transition hover:bg-[#CBB58F] focus:outline-none focus:ring-2 focus:ring-[#6E7A5E] focus:ring-offset-2 ${
          isDetail ? "px-6 text-base" : ""
        }`}
      >
        <ShoppingCart className="h-5 w-5" aria-hidden="true" />
        {/* {isDetail ? (
          <ShoppingCart className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Plus className="h-4 w-4" aria-hidden="true" />
        )} */}
        Add to Cart
      </button>
    );
  }

  return (
    <div
      className={`${controlClassName} grid grid-cols-[2.75rem_minmax(3rem,1fr)_2.75rem] overflow-hidden rounded-md border border-[#8A6F4D] bg-[#FFFDF7] text-[#2B241E] shadow-sm`}
      aria-label={`${food.title} quantity in cart`}
    >
      <button
        type="button"
        onClick={() => decreaseItem(food.id)}
        className="inline-flex h-full items-center justify-center transition hover:bg-[#EFE7D8] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6E7A5E]"
        aria-label={
          quantity === 1 ? `Remove ${food.title} from cart` : `Decrease ${food.title} quantity`
        }
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <span className="inline-flex h-full items-center justify-center border-x border-[#D8CDBB] bg-[#D9C7A7] px-3 text-sm font-bold">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => addItem(food)}
        className="inline-flex h-full items-center justify-center transition hover:bg-[#EFE7D8] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6E7A5E]"
        aria-label={`Increase ${food.title} quantity`}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
