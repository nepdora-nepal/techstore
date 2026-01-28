"use client";

import React from "react";
import Link from "next/link";
import { ArrowRightLeft } from "lucide-react";

interface EmptyCompareStateProps {
    onAddClick: () => void;
}

const EmptyCompareState: React.FC<EmptyCompareStateProps> = ({ onAddClick }) => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
                <ArrowRightLeft size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No Products to Compare
            </h2>
            <p className="text-gray-500 mb-8 max-w-md text-center">
                Browse products and click the compare icon{" "}
                <ArrowRightLeft className="inline w-3 h-3" /> to add them to this
                list. You can compare up to 4 items.
            </p>
            <div className="flex gap-4">
                <Link
                    href="/collections"
                    className="px-8 py-3 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-700 transition-colors"
                >
                    Browse Products
                </Link>
                <button
                    onClick={onAddClick}
                    className="px-8 py-3 bg-white border border-gray-200 text-gray-900 rounded-full font-semibold hover:bg-gray-50 transition-colors"
                >
                    Add Manually
                </button>
            </div>
        </div>
    );
};

export default EmptyCompareState;
