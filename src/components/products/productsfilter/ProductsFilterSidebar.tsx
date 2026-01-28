"use client";

import { useState, useRef } from "react";
import { RotateCcw, Loader2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category, SubCategory } from "@/types/product";
import { useSubCategories } from "@/hooks/use-subcategory";
import PriceRangeSlider from "../PriceRangeSlider";

interface PriceRange {
  min: number;
  max: number;
}

interface ProductsFilterSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (value: string) => void;
  priceRange: PriceRange;
  setPriceRange: (value: PriceRange) => void;
  categories: Category[];
  handleClearAll: () => void;
  isFiltering?: boolean;
}

const MIN_PRICE = 0;
const MAX_PRICE = 300000;

export default function ProductsFilterSidebar({
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  priceRange,
  setPriceRange,
  categories,
  handleClearAll,
  isFiltering = false,
}: ProductsFilterSidebarProps) {
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null);

  const { data: subcategoriesData, isLoading: isLoadingSubcategories } =
    useSubCategories(
      hoveredCategory?.id ? { category: hoveredCategory.id } : undefined,
    );

  const handleMouseEnter = (category: Category) => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    leaveTimeout.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 200);
  };

  const handleSelectCategory = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setSelectedSubcategory("all");
    setHoveredCategory(null);
  };

  const handleSelectSubcategory = (subcategorySlug: string) => {
    if (hoveredCategory) setSelectedCategory(hoveredCategory.slug);
    setSelectedSubcategory(subcategorySlug);
    setHoveredCategory(null);
  };

  const renderSkeleton = (count = 5) => (
    <div className="py-2 px-1">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="px-3 py-2">
          <div className="w-full h-3 bg-gray-100 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="sticky p-6 bg-card rounded-3xl border border-border/50  top-24"
      onMouseLeave={handleMouseLeave}
    >
      <div className="mb-10">
        <h2 className="mb-6 text-sm font-bold text-foreground uppercase tracking-widest">
          Categories
        </h2>
        <div className="space-y-1">
          <Button
            variant="ghost"
            onClick={() => handleSelectCategory("all")}
            className={`w-full justify-start px-4 py-2.5 rounded-xl text-xs font-bold transition-all h-auto ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground  hover:bg-primary/90 hover:text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-muted-foreground"
            }`}
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <div
              key={category.slug}
              className="relative"
              onMouseEnter={() => handleMouseEnter(category)}
            >
              <Button
                variant="ghost"
                onClick={() => handleSelectCategory(category.slug)}
                className={`w-full justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center h-auto ${
                  selectedCategory === category.slug
                    ? "bg-primary text-primary-foreground  hover:bg-primary/90 hover:text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-muted-foreground"
                }`}
              >
                <span>{category.name}</span>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${hoveredCategory?.slug === category.slug ? "translate-x-0.5" : ""}`}
                />
              </Button>
              {hoveredCategory?.slug === category.slug && (
                <div
                  className="absolute left-[calc(100%+0.5rem)] top-0 w-64 z-[50] bg-card rounded-2xl  border border-border/50 p-2"
                  onMouseEnter={() => handleMouseEnter(category)}
                >
                  {isLoadingSubcategories ? (
                    renderSkeleton()
                  ) : subcategoriesData?.results &&
                    subcategoriesData.results.length > 0 ? (
                    <div className="space-y-0.5">
                      {subcategoriesData.results.map(
                        (subcategory: SubCategory) => (
                          <Button
                            variant="ghost"
                            key={subcategory.slug}
                            onClick={() =>
                              handleSelectSubcategory(subcategory.slug)
                            }
                            className={`w-full justify-start px-4 py-2.5 rounded-xl text-xs font-semibold transition-all hover:bg-secondary h-auto ${
                              selectedSubcategory === subcategory.slug
                                ? "text-primary bg-primary/5 hover:bg-primary/10 hover:text-primary"
                                : "text-muted-foreground hover:text-muted-foreground"
                            }`}
                          >
                            {subcategory.name}
                          </Button>
                        ),
                      )}
                    </div>
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-wider">
                        No Subcategories
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h3 className="mb-6 text-sm font-bold text-foreground uppercase tracking-widest">
          Price Filter
        </h3>
        <PriceRangeSlider
          value={priceRange}
          onChange={setPriceRange}
          min={MIN_PRICE}
          max={MAX_PRICE}
        />
      </div>

      <div className="pt-6 border-t border-border/50">
        <Button
          variant="ghost"
          onClick={handleClearAll}
          className="flex items-center justify-center w-full gap-2 px-4 py-6 text-xs font-bold text-muted-foreground transition-all bg-secondary/50 rounded-xl hover:bg-secondary active:scale-[0.98] border-none"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset All
        </Button>
        {isFiltering && (
          <div className="flex items-center justify-center gap-2 pt-4 text-[10px] font-bold text-primary uppercase tracking-widest">
            <Loader2 className="w-3 h-3 animate-spin" /> Updating Results
          </div>
        )}
      </div>
    </div>
  );
}
