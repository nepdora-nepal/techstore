"use client";

import { Heart } from "lucide-react";

interface WishlistButtonProps {
    size?: "sm" | "md" | "lg";
    isActive?: boolean;
    onToggle?: (active: boolean) => void;
}

export default function WishlistButton({
    size = "md",
    isActive = false,
    onToggle,
}: WishlistButtonProps) {
    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onToggle) onToggle(!isActive);
    };

    const sizeClasses = {
        sm: "p-1.5",
        md: "p-2",
        lg: "p-2.5",
    };

    const iconSizes = {
        sm: 14,
        md: 18,
        lg: 22,
    };

    return (
        <button
            onClick={handleToggle}
            className={`${sizeClasses[size]} rounded-full transition-all duration-300 transform hover:scale-110 ${isActive
                ? "bg-destructive/10 text-destructive"
                : "bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-destructive shadow-sm"
                }`}
        >
            <Heart
                size={iconSizes[size]}
                className={isActive ? "fill-current" : ""}
            />
        </button>
    );
}
