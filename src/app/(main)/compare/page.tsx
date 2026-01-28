"use client";

import React, { useState } from "react";
import { useTechStoreCompare } from "@/contexts/TechStoreCompareContext";
import { useCart } from "@/hooks/use-cart";
import { X } from "lucide-react";
import AddProductDialog from "@/components/compare/AddProductDialog";
import EmptyCompareState from "@/components/compare/EmptyCompareState";
import CompareTable from "@/components/compare/CompareTable";
import { Product } from "@/types/product";

const ComparePage: React.FC = () => {
  const { compareItems, addToCompare, removeFromCompare, clearCompare } =
    useTechStoreCompare();
  const { addToCart } = useCart();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddProduct = (p: Product) => {
    addToCompare(p);
    setIsDialogOpen(false);
  };

  if (compareItems.length === 0) {
    return (
      <>
        <EmptyCompareState onAddClick={() => setIsDialogOpen(true)} />
        <AddProductDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onAdd={handleAddProduct}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-navy-900">
            Product Comparison
          </h1>
          <div className="flex items-center gap-4">

            <button
              onClick={clearCompare}
              className="text-sm font-medium text-red-500 hover:text-red-700 flex items-center gap-1"
            >
              <X size={16} /> Clear All
            </button>
          </div>
        </div>

        <CompareTable
          compareItems={compareItems}
          removeFromCompare={removeFromCompare}
          addToCart={addToCart}
          onAddClick={() => setIsDialogOpen(true)}
        />
      </div>

      <AddProductDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAdd={handleAddProduct}
      />
    </div>
  );
};

export default ComparePage;
