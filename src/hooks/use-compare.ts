"use client";

import { useTechStoreCompare } from "@/contexts/TechStoreCompareContext";

/**
 * A unified hook for compare functionality.
 * Wraps useTechStoreCompare to provide a consistent interface.
 */
export const useCompare = () => {
  const { compareItems, addToCompare, removeFromCompare, isInCompare } =
    useTechStoreCompare();

  return {
    compareItems,
    addToCompare,
    removeFromCompare,
    isInCompare,
  };
};
