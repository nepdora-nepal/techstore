"use client";

import React from "react";

import { useProducts } from "@/hooks/use-product";
import { useCategories } from "@/hooks/use-category";
import Hero from "./Hero";
import CategoryGrid from "./CategoryGrid";
import CategoryBannerListLeft from "./CategoryBannerListLeft";
import CategoryBannerListRight from "./CategoryBannerListRight";
import HorizontalProductList from "./HorizontalProductList";
import Brands from "./Brands";
import Newsletter from "../newsletter/Newsletter";
import MultiCategoryTabs from "./MultiCategoryTabs";
import BlogListingContent from "../blogs/BlogListingContent";
import { Suspense } from "react";

const TechStoreHome: React.FC = () => {
  const { data: productsData, isLoading: productsLoading } = useProducts({
    page_size: 20,
  });
  const { isLoading: categoriesLoading } = useCategories();

  const products = productsData?.results || [];
  const loading = productsLoading || categoriesLoading;

  if (loading) {
    return (
      <div className="bg-white min-h-screen pt-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white pb-20 overflow-x-hidden">
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-20">
        {/* Category Icons Grid */}
        <CategoryGrid />

        <HorizontalProductList
          title="Hukut Hot Deals"
          subtitle="Don't Miss Out"
          products={products.slice(0, 6)}
        />

        <HorizontalProductList
          title="Top Products"
          subtitle="Performance Meets Elegance"
          products={products.filter((p) => p.is_popular).slice(0, 6)}
        />

        {/* Right-variant banners (place anywhere) */}
        <CategoryBannerListRight />

        {/* Left-variant banners (place anywhere) */}
        <CategoryBannerListLeft />

        <HorizontalProductList
          title="Best Selling Products"
          subtitle="Unbeatable Performance"
          products={products.filter((p) => p.is_featured).slice(0, 6)}
        />

        {/* Brands Strip */}
        <div className="mt-12">
          <Brands />
        </div>

        {/* VR Section */}

        <MultiCategoryTabs products={products} />
        <Suspense fallback={<div>Loading...</div>}>
          {/* Blog Section */}
          <BlogListingContent />
        </Suspense>
        <div className="mt-10 border-gray-100 pt-24">
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default TechStoreHome;
