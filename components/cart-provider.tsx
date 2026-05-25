"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode
} from "react";
import type { FoodProduct } from "@/lib/types";

interface CartItem {
  food: FoodProduct;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  totalQuantity: number;
  addItem: (food: FoodProduct) => void;
  decreaseItem: (foodId: string) => void;
  removeItem: (foodId: string) => void;
  getQuantity: (foodId: string) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [itemsById, setItemsById] = useState<Record<string, CartItem>>({});

  const addItem = useCallback((food: FoodProduct) => {
    setItemsById((currentItems) => {
      const currentItem = currentItems[food.id];

      return {
        ...currentItems,
        [food.id]: {
          food,
          quantity: currentItem ? currentItem.quantity + 1 : 1
        }
      };
    });
  }, []);

  const decreaseItem = useCallback((foodId: string) => {
    setItemsById((currentItems) => {
      const currentItem = currentItems[foodId];

      if (!currentItem) {
        return currentItems;
      }

      if (currentItem.quantity <= 1) {
        const remainingItems = { ...currentItems };
        delete remainingItems[foodId];
        return remainingItems;
      }

      return {
        ...currentItems,
        [foodId]: {
          ...currentItem,
          quantity: currentItem.quantity - 1
        }
      };
    });
  }, []);

  const removeItem = useCallback((foodId: string) => {
    setItemsById((currentItems) => {
      if (!currentItems[foodId]) {
        return currentItems;
      }

      const remainingItems = { ...currentItems };
      delete remainingItems[foodId];
      return remainingItems;
    });
  }, []);

  const value = useMemo(() => {
    const items = Object.values(itemsById);

    return {
      items,
      totalQuantity: items.reduce((total, item) => total + item.quantity, 0),
      addItem,
      decreaseItem,
      removeItem,
      getQuantity: (foodId: string) => itemsById[foodId]?.quantity ?? 0
    };
  }, [addItem, decreaseItem, itemsById, removeItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
