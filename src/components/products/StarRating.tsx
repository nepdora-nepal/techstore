"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
    rating: number;
    reviewCount?: number;
}

export default function StarRating({ rating, reviewCount }: StarRatingProps) {
    return (
        <div className="flex items-center gap-1.5">
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={12}
                        className={`${i < Math.floor(rating)
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-muted-foreground/30 fill-muted-foreground/30"
                            }`}
                    />
                ))}
            </div>
            {reviewCount !== undefined && (
                <span className="text-[10px] text-muted-foreground font-bold">
                    ({reviewCount})
                </span>
            )}
        </div>
    );
}
