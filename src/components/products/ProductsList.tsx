"use client";

import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface SortOption {
  value: string;
  label: string;
}

interface ProductsListProps {
  products: Product[];
  loading: boolean;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortOptions: SortOption[];
}

export default function ProductsList({
  products,
  loading,

}: ProductsListProps) {
  return (
    <div className="flex-1">


      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton
              key={i}
              className="rounded-[2.5rem] bg-secondary aspect-[4/5]"
            />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center  rounded-[3rem] border-2 border-dashed border-border/50">
          <div className="bg-card w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl text-muted-foreground/20">
            <Loader2 size={40} className="animate-pulse" />
          </div>
          <h3 className="text-2xl font-black text-foreground mb-3  tracking-tighter">
            Product not found
          </h3>
          <p className="text-muted-foreground font-medium max-w-xs mx-auto text-sm leading-relaxed">
            We couldn&apos;t find items matching your current filters. Try
            broadening your horizons.
          </p>
        </div>
      )}
    </div>
  );
}
