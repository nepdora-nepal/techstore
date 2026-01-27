"use client";

import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

export const Features: React.FC = () => {
    const features = [
        {
            icon: <Truck size={24} />,
            title: 'Fast Delivery',
            desc: 'Free shipping over RS.100',
        },
        {
            icon: <ShieldCheck size={24} />,
            title: 'Secure Payment',
            desc: '100% secure processing',
        },
        {
            icon: <RotateCcw size={24} />,
            title: 'Easy Returns',
            desc: '30-day money back',
        },
        {
            icon: <Headphones size={24} />,
            title: '24/7 Support',
            desc: 'Always here to help',
        }
    ];

    return (
        <div className="bg-primary py-16">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-primary-foreground">
                {features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-4 p-6 rounded-2xl bg-primary-foreground/10 hover:bg-primary-foreground/15 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center text-primary-foreground">
                            {feat.icon}
                        </div>
                        <div>
                            <h4 className="font-bold">{feat.title}</h4>
                            <p className="text-primary-foreground/60 text-sm">{feat.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
