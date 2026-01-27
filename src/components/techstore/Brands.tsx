"use client";

import React from 'react';
import Image from 'next/image';
import { useGetOurClients } from '@/hooks/use-our-client';

const Brands: React.FC = () => {
    const { data: clients, isLoading } = useGetOurClients();

    if (isLoading) {
        return (
            <div className="py-20 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-center items-center gap-12 md:gap-20 opacity-20">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!clients || clients.length === 0) return null;

    return (
        <div className="py-20 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4">
                <p className="text-center text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-12">Authorized Excellence Partner</p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-700">
                    {clients.map((client) => (
                        <div key={client.id} className="relative h-6 md:h-8 w-24 md:w-32 transition-transform hover:scale-110 grayscale hover:grayscale-0 duration-300">
                            <Image
                                src={client.logo as string}
                                alt={client.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Brands;
