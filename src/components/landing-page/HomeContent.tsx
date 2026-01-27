"use client";

import  Hero  from "@/components/landing-page/Hero";
import { FeaturedCategories } from "@/components/landing-page/FeaturedCategories";
import { FeaturedProducts } from "@/components/landing-page/FeaturedProducts";
import { Features } from "@/components/landing-page/Features";
import { Testimonials } from "@/components/landing-page/Testimonials";
import { LatestBlogs } from "@/components/landing-page/LatestBlogs";
import { FAQSection } from "@/components/landing-page/FAQSection";
import { Newsletter } from "@/components/landing-page/Newsletter";
import ContactUs from "@/components/landing-page/ContactUs";

const HomeContent: React.FC = () => {
    return (
        <div className="bg-white">
            <Hero />
            <FeaturedCategories />
            <FeaturedProducts />
            <Features />
            <Testimonials />
            <LatestBlogs />
            <FAQSection />
            <ContactUs />
            <Newsletter />
        </div>
    );
};

export default HomeContent;
