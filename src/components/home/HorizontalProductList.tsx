"use client";

import React from "react";
import { Product } from "@/types/product";
import ProductCard from "../products/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HorizontalProductListProps {
  title: string;
  products: Product[];
  subtitle?: string;
}

const HorizontalProductList: React.FC<HorizontalProductListProps> = ({
  title,
  products,
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl  text-navy-950 tracking-tight leading-tight">
              {title}
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-navy-950 hover:bg-navy-950 hover:text-white hover:scale-105 transition-all shadow-xl shadow-gray-200/50"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-navy-950 hover:bg-navy-950 hover:text-white hover:scale-105 transition-all shadow-xl shadow-gray-200/50"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto  scrollbar-none snap-x snap-mandatory pb-10"
      >
        {products.map((product) => (
          <div key={product.id} className="w-[300px] flex-shrink-0 snap-start">
            <ProductCard product={product} />
          </div>
        ))}
        {/* Placeholder if few items */}
      </div>
    </div>
  );
};

export default HorizontalProductList;
