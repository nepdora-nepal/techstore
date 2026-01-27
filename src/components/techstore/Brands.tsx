"use client";

import React from 'react';

const Brands: React.FC = () => {
    const brands = [
        "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
        "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/7/7b/Sony_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/0/08/LG_logo_%282014%29.svg",
        "https://upload.wikimedia.org/wikipedia/commons/4/4c/Asus_Logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg"
    ];

    return (
        <div className="py-20 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4">
                <p className="text-center text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-12">Authorized Excellence Partner</p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-700">
                    {brands.map((brand, i) => (
                        <img key={i} src={brand} className="h-6 md:h-8 object-contain cursor-help transition-transform hover:scale-110" alt="Brand" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Brands;
