"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ImageWithFallback from "@/components/common/ImageWithFallback";

interface WhatsAppButtonProps {
    phoneNumber: string;
    message?: string;
    className?: string;
    icon?: React.ReactNode;
}

export function WhatsAppButton({
    phoneNumber,
    message = "Hello! I'm interested in your products/services.",
    className = "",
    icon,
}: WhatsAppButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    const handleWhatsAppClick = () => {
        // Format phone number (remove any non-digit characters)
        const formattedPhone = phoneNumber.replace(/\D/g, "");

        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);

        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;

        // Open WhatsApp in a new window/tab
        window.open(whatsappUrl, "_blank");
    };

    // Default WhatsApp icon using the provided image
    const defaultWhatsAppIcon = (
        <ImageWithFallback
            id="whatsapp-icon"
            src="/whatsapp-icon.png"
            fallbackSrc="/whatsapp-icon.png" // Fallback to same for now or a generic one if available
            alt="WhatsApp"
            width={50}
            height={50}
        />
    );

    return (
        <div className="fixed right-6 bottom-6 z-[999]">
            {/* WhatsApp Button */}
            <Button
                onClick={handleWhatsAppClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                aria-label="Contact us on WhatsApp"
                className={`relative h-14 w-14 rounded-full bg-[#2ea218] p-0 shadow-lg hover:bg-[#2ea218] hover:scale-110 transition-transform ${className}`}
            >
                <div className="text-white flex items-center justify-center">
                    {icon || defaultWhatsAppIcon}
                </div>
            </Button>

            {/* Hover tooltip */}
            {isHovered && (
                <div className="absolute right-0 bottom-16 mb-2 rounded-lg bg-gray-800 px-3 py-2 text-sm whitespace-nowrap text-white shadow-lg animate-in fade-in slide-in-from-bottom-2">
                    Chat with us on WhatsApp
                    {/* Arrow pointing down */}
                    <div className="absolute top-full right-4 h-0 w-0 border-t-4 border-r-4 border-l-4 border-t-gray-800 border-r-transparent border-l-transparent" />
                </div>
            )}
        </div>
    );
}
