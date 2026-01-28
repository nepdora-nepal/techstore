"use client";

import React from "react";
import CategoryBanner from "./CategoryBanner";
import { CATEGORY_BANNERS } from "./banners";

const CategoryBannerList: React.FC = () => {
  return (
    <>
      {CATEGORY_BANNERS.map((b) => (
        <div className="py-12" key={b.id}>
          <CategoryBanner
            title={b.title}
            subtitle={b.subtitle}
            description={b.description}
            image={b.image}
            bgClass={b.bgClass}
            variant={b.variant as "left" | "right"}
          />
        </div>
      ))}
    </>
  );
};

export default CategoryBannerList;
