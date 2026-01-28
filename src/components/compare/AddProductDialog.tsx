"use client";

import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import Image from "next/image";
import { useProducts } from "@/hooks/use-product";
import { useDebounce } from "@/hooks/use-debounce";
import { Product } from "@/types/product";

interface AddProductDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (product: Product) => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ isOpen, onClose, onAdd }) => {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);

    const { data: productsData, isLoading } = useProducts({
        search: debouncedSearch || undefined,
        page_size: 10
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-navy-950/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-navy-900">Add Product to Compare</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <div className="relative mb-6">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                        />
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/*eslint-disable-next-line*/}
                            {productsData?.results?.map((product: Product) => (
                                <div key={product.id} className="p-3 border border-gray-100 rounded-2xl flex items-center gap-4 hover:border-brand-500/30 hover:bg-brand-50/10 transition-all group">
                                    <div className="w-16 h-16 bg-gray-50 rounded-lg p-2 flex-shrink-0">
                                        <Image
                                            src={product.thumbnail_image || "/images/placeholder.svg"}
                                            alt={product.name}
                                            width={64}
                                            height={64}
                                            className="w-full h-full object-contain mix-blend-multiply"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-bold text-gray-900 truncate mb-1">{product.name}</h3>
                                        <p className="text-xs font-bold text-brand-600">Rs. {Number(product.price).toLocaleString("en-IN")}</p>
                                    </div>
                                    <button
                                        onClick={() => onAdd(product)}
                                        className="p-2 bg-brand-50 text-brand-600 rounded-xl hover:bg-brand-600 hover:text-white transition-all shadow-sm"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                            ))}
                            {productsData?.results?.length === 0 && (
                                <div className="col-span-full py-12 text-center text-gray-400">
                                    No products found.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddProductDialog;
