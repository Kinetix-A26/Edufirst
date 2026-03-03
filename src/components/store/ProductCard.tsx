"use client";

import React from 'react';
import { Product } from './types';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
    const isOutOfStock = product.stock === 0;

    return (
        <div
            className="group flex flex-col bg-white dark:bg-gray-900 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-[#9156FF]/30 dark:hover:border-[#9156FF]/50"
            style={{ borderRadius: '14px' }}
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] bg-gray-50 dark:bg-gray-800 overflow-hidden">
                {/* Mock image placeholder using gradient if no real image provided */}
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-[#9156FF]/10 flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-[#9156FF]/20" />
                    </div>
                )}

                {/* Stock Badge */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {isOutOfStock ? (
                        <span className="bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                            Épuisé
                        </span>
                    ) : product.stock < 10 && (
                        <span className="bg-amber-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                            Stock limité
                        </span>
                    )}
                    <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                        {product.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg line-clamp-1 mb-1">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-1">
                    {product.description}
                </p>

                <div className="flex items-end justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-medium">Prix unitaire</span>
                        <span className="text-xl font-bold text-[#9156FF]">
                            {product.price.toLocaleString('fr-FR')} {product.currency}
                        </span>
                    </div>

                    <button
                        onClick={() => onAddToCart(product)}
                        disabled={isOutOfStock}
                        className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${isOutOfStock
                                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                                : 'bg-[#9156FF] text-white hover:bg-[#7b42ea] hover:scale-105 active:scale-95 shadow-md shadow-[#9156FF]/20'
                            }`}
                        aria-label="Ajouter au panier"
                    >
                        <ShoppingBag className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
