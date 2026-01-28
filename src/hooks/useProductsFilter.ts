"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useProducts } from "./use-product";
import { useCategories } from "./use-category";
import { useSubCategories } from "./use-subcategory";
import { Category, SubCategory } from "@/types/product";

const PAGE_SIZE = 9;

interface PriceRange {
  min: number;
  max: number;
}

interface SortOption {
  value: string;
  label: string;
}

const sortMapping: {
  [key: string]: { sortBy: string; sortOrder: "asc" | "desc" };
} = {
  featured: { sortBy: "is_featured", sortOrder: "desc" },
  "price-low": { sortBy: "price", sortOrder: "asc" },
  "price-high": { sortBy: "price", sortOrder: "desc" },
  "name-asc": { sortBy: "name", sortOrder: "asc" },
  "name-desc": { sortBy: "name", sortOrder: "desc" },
};

export const useProductsFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isMounted = useRef(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: 0,
    max: 300000,
  });
  const [sortBy, setSortBy] = useState<string>("featured");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");

  const { data: categoriesData, isLoading: loadingCategories } =
    useCategories();
  const categories: Category[] = useMemo(
    () => categoriesData?.results || [],
    [categoriesData],
  );

  const categoryId = useMemo(() => {
    if (selectedCategory === "all") return undefined;
    const category = categories.find((c) => c.slug === selectedCategory);
    return category?.id;
  }, [selectedCategory, categories]);

  const { data: subcategoriesData, isLoading: loadingSubcategories } =
    useSubCategories(categoryId ? { category: categoryId } : undefined);
  const subcategories: SubCategory[] = subcategoriesData?.results || [];

  // Map URL params (snake_case) to internal state. We support the API's expected keys.
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const newSearchQuery = params.get("search") || "";
    setCurrentPage(Number(params.get("page")) || 1);
    setSelectedCategory(params.get("category") || "all");
    // backend uses `sub_category` param
    setSelectedSubcategory(params.get("sub_category") || "all");

    // map sort_by + sort_order back to our internal sort key
    const sort_by = params.get("sort_by");
    const sort_order = (params.get("sort_order") || "").toLowerCase();

    const findSortKey = () => {
      if (!sort_by) return "featured";
      for (const [key, val] of Object.entries(sortMapping)) {
        if (
          val.sortBy === sort_by &&
          val.sortOrder === (sort_order as "asc" | "desc")
        ) {
          return key;
        }
      }
      return "featured";
    };

    setSortBy(findSortKey());
    setSearchQuery(newSearchQuery);
    setDebouncedSearchQuery(newSearchQuery);
    setPriceRange({
      min: Number(params.get("min_price")) || 0,
      max: Number(params.get("max_price")) || 300000,
    });
    isMounted.current = true;
  }, [searchParams]);

  useEffect(() => {
    if (!isMounted.current) return;
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      if (searchQuery !== (searchParams.get("search") || "")) {
        setCurrentPage(1);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, searchParams]);

  useEffect(() => {
    if (!isMounted.current) return;
    const params = new URLSearchParams();
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (selectedSubcategory !== "all")
      params.set("sub_category", selectedSubcategory);
    if (debouncedSearchQuery) params.set("search", debouncedSearchQuery);

    // Map internal sort key to API params
    const mappedSort = sortMapping[sortBy] || sortMapping["featured"];
    // Only set sort params if it's not the default featured ordering
    if (sortBy && sortBy !== "featured") {
      params.set("sort_by", mappedSort.sortBy);
      params.set("sort_order", mappedSort.sortOrder);
    }

    if (priceRange.min > 0) params.set("min_price", String(priceRange.min));
    if (priceRange.max < 300000)
      params.set("max_price", String(priceRange.max));
    if (currentPage > 1) params.set("page", String(currentPage));

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [
    selectedCategory,
    selectedSubcategory,
    debouncedSearchQuery,
    sortBy,
    priceRange,
    currentPage,
    pathname,
    router,
  ]);

  const currentFilters = useMemo(
    () => ({
      category: selectedCategory !== "all" ? selectedCategory : undefined,
      subcategory:
        selectedSubcategory !== "all" ? selectedSubcategory : undefined,
      min_price: priceRange.min,
      max_price: priceRange.max,
      ordering: sortMapping[sortBy] || sortMapping["featured"],
      search: debouncedSearchQuery,
      page: currentPage,
      page_size: PAGE_SIZE,
    }),
    [
      selectedCategory,
      selectedSubcategory,
      priceRange,
      sortBy,
      debouncedSearchQuery,
      currentPage,
    ],
  );

  const {
    data: productsResponse,
    isLoading,
    isFetching,
    isError,
  } = useProducts(currentFilters);
  const products = productsResponse?.results || [];
  const totalCount = productsResponse?.count || 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleCategoryChange = useCallback((categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setSelectedSubcategory("all");
    setCurrentPage(1);
  }, []);

  const handleSubcategoryChange = useCallback((subcategorySlug: string) => {
    setSelectedSubcategory(subcategorySlug);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  }, []);

  const handlePriceRangeChange = useCallback((newPriceRange: PriceRange) => {
    setPriceRange(newPriceRange);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleClearAll = useCallback(() => {
    setSelectedCategory("all");
    setSelectedSubcategory("all");
    setPriceRange({ min: 0, max: 300000 });
    setSortBy("featured");
    setSearchQuery("");
    setCurrentPage(1);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const sortOptions: SortOption[] = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
  ];

  return {
    selectedCategory,
    setSelectedCategory: handleCategoryChange,
    selectedSubcategory,
    setSelectedSubcategory: handleSubcategoryChange,
    priceRange,
    setPriceRange: handlePriceRangeChange,
    sortBy,
    setSortBy: handleSortChange,
    searchQuery,
    setSearchQuery: handleSearchChange,
    categories,
    subcategories,
    products,
    sortOptions,
    loading:
      isLoading || isFetching || loadingCategories || loadingSubcategories,
    error: isError,
    isFiltering: isFetching && !isLoading,
    handleClearAll,
    handleClearSearch,
    currentPage,
    totalPages,
    handlePageChange,
  };
};
