"use client";

import React from "react";
import CategoryBanner from "./CategoryBanner";
import { CATEGORY_BANNERS } from "./banners";

const CategoryBannerListRight: React.FC = () => {
  const rightBanners = CATEGORY_BANNERS.filter((b) => b.variant === "right");

  if (rightBanners.length === 0) return null;

  return (
    <>
      {rightBanners.map((b) => (
        <div className="py-12" key={b.id}>
          <CategoryBanner
            title={b.title}
            subtitle={b.subtitle}
            description={b.description}
            image={b.image}
            bgClass={b.bgClass}
            variant={"right"}
          />
        </div>
      ))}
    </>
  );
};

export default CategoryBannerListRight;
