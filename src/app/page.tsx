"use client";

import { Hero } from "@/components/home/Hero";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Features } from "@/components/home/Features";
import { Testimonials } from "@/components/home/Testimonials";
import { LatestBlogs } from "@/components/home/LatestBlogs";
import { Newsletter } from "@/components/home/Newsletter";

const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <Features />
      <Testimonials />
      <LatestBlogs />
      <Newsletter />
    </div>
  );
};

export default HomePage;
