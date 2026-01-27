"use client";

import React from 'react';
import Link from 'next/link';

interface SaleBannerProps {
    title: string;
    subtitle: string;
    image: string;
    buttonText: string;
    link: string;
    color: string;
    reversed?: boolean;
}

const SaleBanner: React.FC<SaleBannerProps> = ({ title, subtitle, image, buttonText, link, color, reversed }) => {
    return (
        <div className={`relative overflow-hidden rounded-3xl p-10 min-h-[400px] flex items-center ${color} ${reversed ? 'flex-row-reverse' : ''} group`}>
            <div className="max-w-md relative z-10 w-full">
                <span className="text-xs font-black uppercase tracking-[0.2em] mb-4 block opacity-80">Flash Deal Series</span>
                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">{title}</h2>
                <p className="text-lg opacity-70 font-medium mb-10 leading-relaxed">{subtitle}</p>
                <Link
                    href={link}
                    className="inline-block px-10 py-5 bg-navy-950 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white hover:text-navy-950 transition-all shadow-2xl active:scale-95 translate-y-0 hover:-translate-y-1"
                >
                    {buttonText}
                </Link>
            </div>

            <div className="absolute right-0 bottom-0 top-0 w-1/2 overflow-hidden pointer-events-none md:block hidden">
                <img
                    src={image}
                    className={`w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-all duration-700 delay-100 ${reversed ? '-scale-x-100' : ''}`}
                    alt="Promotion"
                />
            </div>

            {/* Floating Circle Decor */}
            <div className="absolute top-10 right-20 w-32 h-32 border-[20px] border-white/5 rounded-full blur-sm" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/5 rounded-full" />
        </div>
    );
};

export default SaleBanner;
