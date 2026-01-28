import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ImageWithFallback from "@/components/common/ImageWithFallback";

interface CategoryBannerProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  fallback?: string;
  variant?: "left" | "right";
  bgClass?: string;
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({
  title,
  subtitle,
  description,
  image,
  variant = "left",
  bgClass = "bg-gray-900",
}) => {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative rounded-3xl overflow-hidden ${bgClass} text-white min-h-[360px] md:min-h-[420px] flex items-center shadow-2xl group`}
        >
          {/* Background Image/Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-50"></div>
          </div>

          <div
            className={`relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 md:p-16 ${variant === "right" ? "" : ""}`}
          >
            {/* Text Content */}
            <div
              className={`order-2 ${variant === "right" ? "md:order-1" : "md:order-2"} ${variant === "right" ? "md:pr-12" : "md:pl-12"}`}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/10 text-xs font-bold uppercase tracking-wider mb-6">
                {subtitle}
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                {title}
              </h2>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {description}
              </p>
              <Link
                href="/collections"
                className="inline-flex items-center px-8 py-3.5 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Explore Collection <ChevronRight size={18} className="ml-2" />
              </Link>
            </div>

            {/* Product Image */}
            <div
              className={`order-1 ${variant === "right" ? "md:order-2" : "md:order-1"} flex justify-center`}
            >
              <ImageWithFallback
                id={image}
                src={image}
                alt={title}
                width={500}
                height={500}
                fallbackSrc={"/fallback-product.svg"}
                className={`
                  w-full max-w-sm md:max-w-md object-contain drop-shadow-2xl 
                  transition-transform duration-700 ease-out 
                  ${variant === "right" ? "group-hover:-translate-x-4 group-hover:rotate-2" : "group-hover:translate-x-4 group-hover:-rotate-2"}
                `}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryBanner;
