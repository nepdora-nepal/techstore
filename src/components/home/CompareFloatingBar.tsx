"use client";

import React from "react";
import { useTechStoreCompare } from "@/contexts/TechStoreCompareContext";
import { X, ArrowRightLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CompareFloatingBar: React.FC = () => {
  const { compareItems, removeFromCompare, clearCompare, isCompareBarVisible, setIsCompareBarVisible } =
    useTechStoreCompare();

  if (compareItems.length === 0 || !isCompareBarVisible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-3xl px-4 animate-fade-in-up">
      <div className="bg-navy-950 text-white rounded-3xl shadow-2xl p-4 flex items-center justify-between gap-6 border border-white/10 backdrop-blur-md relative">
        {/* Close Button */}
        <button
          onClick={() => setIsCompareBarVisible(false)}
          className="absolute -top-3 -right-3 bg-navy-900 border border-white/20 text-white p-1.5 rounded-full hover:bg-red-500 transition-colors shadow-lg"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-4 flex-1">
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-black uppercase tracking-widest text-brand-400">
              Compare
            </span>
            <span className="text-[10px] opacity-60 font-medium">
              ({compareItems.length}/4 items)
            </span>
          </div>

          <div className="flex -space-x-3 overflow-hidden">
            {compareItems.map((item) => (
              <div key={item.id} className="relative group">
                <div className="w-12 h-12 bg-white rounded-xl p-1.5 border-2 border-navy-950 shadow-lg cursor-pointer overflow-hidden">
                  <Image
                    height={48}
                    width={48}
                    src={item.thumbnail_image ?? "/placeholder.png"}
                    alt={item.thumbnail_alt_description ?? item.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <button
                  onClick={() => removeFromCompare(item.id)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={10} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={clearCompare}
            className="p-2.5 text-slate-400 hover:text-white transition-colors"
            title="Clear all"
          >
            <Trash2 size={20} />
          </button>
          <Link
            href="/compare"
            className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-brand-900/40 flex items-center gap-2"
          >
            Compare <ArrowRightLeft size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompareFloatingBar;
