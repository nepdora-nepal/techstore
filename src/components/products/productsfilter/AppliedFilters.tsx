"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryLike {
    slug: string;
    name: string;
}

interface AppliedFiltersProps {
    selectedCategory: string;
    setSelectedCategory: (slug: string) => void;
    categories: CategoryLike[];

    selectedSubcategory: string;
    setSelectedSubcategory: (slug: string) => void;
    subcategories: CategoryLike[];

    priceRange: { min: number; max: number };
    setPriceRange: (range: { min: number; max: number }) => void;

    searchQuery: string;
    handleClearSearch: () => void;

    handleClearAll: () => void;

    minPrice: number;
    maxPrice: number;
}

const AppliedFilters: React.FC<AppliedFiltersProps> = ({
    selectedCategory,
    setSelectedCategory,
    categories,
    selectedSubcategory,
    setSelectedSubcategory,
    subcategories,
    priceRange,
    setPriceRange,
    searchQuery,
    handleClearSearch,
    handleClearAll,
    minPrice,
    maxPrice,
}) => {
    const findName = (slug: string, items: CategoryLike[]) =>
        items.find((item) => item.slug === slug)?.name;

    const categoryName = findName(selectedCategory, categories);
    const subcategoryName = findName(selectedSubcategory, subcategories);

    const isPriceDefault =
        priceRange.min === minPrice && priceRange.max === maxPrice;

    interface AppliedFilter {
        key: string;
        label: string;
        value: string;
        onClear: () => void;
    }

    const appliedFilters: AppliedFilter[] = [
        searchQuery && {
            key: "search",
            label: "Search",
            value: `"${searchQuery}"`,
            onClear: handleClearSearch,
        },
        categoryName && {
            key: "category",
            label: "Category",
            value: categoryName,
            onClear: () => setSelectedCategory("all"),
        },
        subcategoryName && {
            key: "subcategory",
            label: "Subcategory",
            value: subcategoryName,
            onClear: () => setSelectedSubcategory("all"),
        },
        !isPriceDefault && {
            key: "price",
            label: "Price",
            value: `RS.${priceRange.min.toLocaleString("en-IN")} - RS.${priceRange.max.toLocaleString("en-IN")}`,
            onClear: () => setPriceRange({ min: minPrice, max: maxPrice }),
        },
    ].filter((f): f is AppliedFilter => !!f);

    if (appliedFilters.length === 0) {
        return null;
    }

    return (
        <div className="px-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-foreground text-sm">Applied Filters</h3>
                {appliedFilters.length > 1 && (
                    <Button
                        variant="link"
                        onClick={handleClearAll}
                        className="text-xs font-medium text-primary hover:no-underline p-0 h-auto"
                    >
                        Clear All
                    </Button>
                )}
            </div>
            <div className="flex flex-wrap gap-2">
                {appliedFilters.map(
                    (filter) =>
                        filter && (
                            <div
                                key={filter.key}
                                className="flex items-center gap-1.5 pl-2 py-1 bg-card text-muted-foreground border border-border rounded-full text-xs"
                            >
                                <span className="font-medium">{filter.value}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={filter.onClear}
                                    className="p-0.5 hover:text-destructive transition-colors h-6 w-6 rounded-full hover:bg-transparent"
                                    aria-label={`Remove ${filter.label} filter`}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        )
                )}
            </div>
        </div>
    );
};

export default AppliedFilters;
