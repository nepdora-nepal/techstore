"use client";

import React from "react";
import CategoryBanner from "./CategoryBanner";
import { CATEGORY_BANNERS } from "./banners";

const CategoryBannerListLeft: React.FC = () => {
  const leftBanners = CATEGORY_BANNERS.filter(
    (b) => (b.variant || "left") === "left",
  );

  if (leftBanners.length === 0) return null;

  return (
    <>
      {leftBanners.map((b) => (
        <div className="py-12" key={b.id}>
          <CategoryBanner
            title={b.title}
            subtitle={b.subtitle}
            description={b.description}
            image={b.image}
            bgClass={b.bgClass}
            variant={"left"}
            link={b.link}
          />
        </div>
      ))}
    </>
  );
};

export default CategoryBannerListLeft;
