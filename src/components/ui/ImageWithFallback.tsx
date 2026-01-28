"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
}

const ImageWithFallback: React.FC<Props> = ({
  src,
  alt,
  width = 500,
  height = 500,
  className,
  fallbackSrc = "/fallback-product.svg",
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => {
        if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
      }}
      // keep layout flexible for callers
    />
  );
};

export default ImageWithFallback;
