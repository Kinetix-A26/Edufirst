"use client";

import React, { useState } from 'react';
import ProductCard from '@/components/store/ProductCard';
import { Product, CartItem } from '@/components/store/types';
import { ShoppingBag, X, CheckCircle2, ChevronRight, Filter } from 'lucide-react';

const mockProducts: Product[] = [
    {
        id: 'prod-1',
        name: 'Uniforme Complet - Collège',
        description: 'Ensemble complet comprenant pantalon/jupe, chemise brodée et gilet aux couleurs de l\'établissement. Tissu respirant et résistant.',
        price: 35000,
        currency: 'FCFA',
        category: 'Uniformes',
        imageUrl: 'https://images.unsplash.com/photo-1620023608779-114af966f91f?q=80&w=600&auto=format&fit=crop',
        stock: 50,
    },
    {
        id: 'prod-2',
        name: 'Pack Manuels Scientifiques - 3ème',
        description: 'Ensemble des manuels de Mathématiques, SVT et Physique-Chimie édition 2026. Obligatoire pour la rentrée.',
        price: 42000,
        currency: 'FCFA',
        category: 'Livres',
        imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop',
        stock: 120,
    },
    {
        id: 'prod-3',
        name: 'Survêtement de Sport',
        description: 'Veste et pantalon de jogging officiels avec le logo de l\'école. Conçu pour le confort lors des séances d\'EPS.',
        price: 25000,
        currency: 'FCFA',
        category: 'Équipement Sportif',
        imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop',
        stock: 8,
    },
    {
        id: 'prod-4',
        name: 'Blouse de Laboratoire',
        description: 'Blouse 100% coton, manches longues. Obligatoire pour les cours de Chimie et SVT.',
        price: 15000,
        currency: 'FCFA',
        category: 'Uniformes',
        imageUrl: 'https://images.unsplash.com/photo-1588607682335-512da5ab1fb5?q=80&w=600&auto=format&fit=crop',
        stock: 0,
    },
    {
        id: 'prod-5',
        name: 'Kit Fournitures Beaux-Arts',
        description: 'Assortiment de pinceaux, peinture acrylique, toiles et carnet de croquis sélectionnés par les professeurs d\'arts plastiques.',
        price: 30000,
        currency: 'FCFA',
        category: 'Équipement Sportif',
        imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop',
        stock: 25,
    }
];

const CATEGORIES = ['Tous', 'Uniformes', 'Livres', 'Équipement Sportif'];

export default function EduStorePage() {
    const [activeCategory, setActiveCategory] = useState<string>('Tous');
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [paymentStep, setPaymentStep] = useState<'cart' | 'checkout' | 'success'>('cart');
    const [selectedMobileMoney, setSelectedMobileMoney] = useState<string | null>(null);

    const filteredProducts = mockProducts.filter(p =>
        activeCategory === 'Tous' ? true : p.category === activeCategory
    );

    const handleAddToCart = (product: Product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCartItems(prev => prev.filter(item => item.product.id !== productId));
    };

    const updateQuantity = (productId: string, delta: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.product.id === productId) {
                const newQuantity = Math.max(1, Math.min(item.quantity + delta, item.product.stock));
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const cartTotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleCheckout = () => {
        setPaymentStep('checkout');
    };

    const handlePayment = () => {
        if (!selectedMobileMoney) return;
        setPaymentStep('success');
        // Mocker un délai de confirmation réseau
        setTimeout(() => {
            setCartItems([]);
            setTimeout(() => {
                setIsCartOpen(false);
                setPaymentStep('cart');
            }, 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50/30 dark:bg-[#0B1120] relative">

            {/* HEADER & FILTERS */}
            <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                                EduStore <span className="text-[#9156FF]">Premium</span>
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                L&apos;excellence exige le meilleur équipement.
                            </p>
                        </div>

                        {/* Category Filters */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0" style={{ scrollbarWidth: 'none' }}>
                            <div className="flex items-center gap-2 bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                                {CATEGORIES.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeCategory === category
                                            ? 'bg-white dark:bg-gray-700 text-[#9156FF] shadow-sm ring-1 ring-gray-200 dark:ring-gray-600'
                                            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* FLOATING CART BUTTON */}
            <button
                onClick={() => setIsCartOpen(true)}
                className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 bg-[#9156FF] text-white p-4 rounded-full shadow-2xl hover:bg-[#7b42ea] hover:scale-105 active:scale-95 transition-all outline-none focus:ring-4 focus:ring-[#9156FF]/30 border-2 border-white/20"
                aria-label="Ouvrir le panier"
            >
                <ShoppingBag className="w-6 h-6" />
                {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900 shadow-md transform scale-110">
                        {cartItemCount}
                    </span>
                )}
            </button>

            {/* PRODUCT GRID */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={handleAddToCart}
                        />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-24">
                        <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Aucun produit trouvé</h3>
                        <p className="text-gray-500">Cette catégorie est actuellement vide.</p>
                    </div>
                )}
            </div>

            {/* SLIDE-OVER CART */}
            {/* Backdrop */}
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 transition-opacity"
                    onClick={() => {
                        if (paymentStep !== 'success') setIsCartOpen(false);
                    }}
                />
            )}

            {/* Cart Panel */}
            <div
                className={`fixed inset-y-0 right-0 w-full md:w-[480px] bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out flex flex-col border-l border-gray-100 dark:border-gray-800 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Cart Header */}
                <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-900">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        Panier d&apos;achats {cartItemCount > 0 && <span className="text-[#9156FF] text-sm px-2 py-0.5 bg-[#9156FF]/10 rounded-full">{cartItemCount} articles</span>}
                    </h2>
                    {paymentStep !== 'success' && (
                        <button
                            onClick={() => { setIsCartOpen(false); setPaymentStep('cart'); }}
                            className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Cart Content */}
                <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: 'none' }}>

                    {/* STEP 1: CART ITEMS */}
                    {paymentStep === 'cart' && (
                        cartItems.length > 0 ? (
                            <div className="space-y-4">
                                {cartItems.map(item => (
                                    <div key={item.product.id} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                                        <div className="w-20 h-24 bg-white dark:bg-gray-900 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-700 shadow-sm relative">
                                            {item.product.imageUrl ? (
                                                <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                                            ) : (
                                                <ShoppingBag className="w-10 h-10 text-gray-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                            )}
                                        </div>
                                        <div className="flex flex-col flex-1 justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-semibold text-sm line-clamp-1">{item.product.name}</h4>
                                                    <button onClick={() => removeFromCart(item.product.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <p className="text-[#9156FF] font-bold text-sm mt-1">{item.product.price.toLocaleString('fr-FR')} {item.product.currency}</p>
                                            </div>

                                            <div className="flex items-center gap-3 mt-2">
                                                <div className="flex items-center bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-0.5">
                                                    <button onClick={() => updateQuantity(item.product.id, -1)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md font-medium">-</button>
                                                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.product.id, 1)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md font-medium">+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-4">
                                <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-700" />
                                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">Votre panier est vide</p>
                                <p className="text-sm">Découvrez notre catalogue et ajoutez des articles à votre panier.</p>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="mt-4 px-6 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-medium transition-colors"
                                >
                                    Continuer mes achats
                                </button>
                            </div>
                        )
                    )}

                    {/* STEP 2: CHECKOUT (MOBILE MONEY) */}
                    {paymentStep === 'checkout' && (
                        <div className="space-y-6">
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                                <h3 className="font-semibold mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-[#9156FF]" />
                                    Mode de paiement
                                </h3>

                                <div className="space-y-3">
                                    {/* Orange Money Mock */}
                                    <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${selectedMobileMoney === 'orange' ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-500/10 shadow-sm' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="orange"
                                            checked={selectedMobileMoney === 'orange'}
                                            onChange={() => setSelectedMobileMoney('orange')}
                                            className="w-5 h-5 text-orange-500 focus:ring-orange-500"
                                        />
                                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-inner">OM</div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm">Orange Money</p>
                                            <p className="text-xs text-gray-500">Paiement instantané et sécurisé</p>
                                        </div>
                                    </label>

                                    {/* Wave / M-Pesa Mock */}
                                    <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${selectedMobileMoney === 'mpesa' ? 'border-[#9156FF] bg-[#9156FF]/5 dark:bg-[#9156FF]/10 shadow-sm' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="mpesa"
                                            checked={selectedMobileMoney === 'mpesa'}
                                            onChange={() => setSelectedMobileMoney('mpesa')}
                                            className="w-5 h-5 text-[#9156FF] focus:ring-[#9156FF]"
                                        />
                                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-[10px] shadow-inner leading-tight text-center">M<br />Pesa</div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm">M-Pesa / Wave</p>
                                            <p className="text-xs text-gray-500">Paiement via USSD</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {selectedMobileMoney && (
                                <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-bottom-4">
                                    <h3 className="font-semibold mb-3 text-sm">Numéro de téléphone</h3>
                                    <input
                                        type="tel"
                                        placeholder="Ex: 07 45 67 89 12"
                                        className="w-full p-4 text-center text-lg font-bold tracking-wider bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#9156FF] focus:border-transparent outline-none transition-all shadow-inner"
                                    />
                                    <p className="text-xs text-center text-gray-500 mt-3 flex items-center justify-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                                        Connexion sécurisée sans IA
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* STEP 3: SUCCESS */}
                    {paymentStep === 'success' && (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in zoom-in duration-500">
                            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-2 shadow-lg shadow-green-500/20">
                                <CheckCircle2 className="w-12 h-12 text-green-500" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Paiement Réussi !</h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Votre reçu a été envoyé par SMS.<br />
                                    Vos articles seront préparés par l'établissement.
                                </p>
                            </div>
                        </div>
                    )}

                </div>

                {/* Cart Footer / Checkout Summary */}
                {cartItems.length > 0 && paymentStep !== 'success' && (
                    <div className="p-6 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-10">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-500">Sous-total</span>
                            <span className="font-medium">{cartTotal.toLocaleString('fr-FR')} FCFA</span>
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-500">Frais scolaires</span>
                            <span className="font-medium">Inclus</span>
                        </div>
                        <div className="flex justify-between items-end mb-6 py-4 border-t border-gray-100 dark:border-gray-800">
                            <span className="text-lg font-medium">Total</span>
                            <span className="text-2xl font-bold text-[#9156FF]">{cartTotal.toLocaleString('fr-FR')} FCFA</span>
                        </div>

                        {paymentStep === 'cart' ? (
                            <button
                                onClick={handleCheckout}
                                className="w-full py-4 bg-[#9156FF] hover:bg-[#7b42ea] text-white rounded-xl font-bold text-lg shadow-lg shadow-[#9156FF]/30 transition-all hover:shadow-[#9156FF]/50 active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                Passer la commande <ChevronRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                onClick={handlePayment}
                                disabled={!selectedMobileMoney}
                                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${selectedMobileMoney
                                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Confirmer le paiement Mobile
                            </button>
                        )}

                        {paymentStep === 'checkout' && (
                            <button
                                onClick={() => setPaymentStep('cart')}
                                className="w-full mt-3 py-3 text-gray-500 font-medium hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                Retour au panier
                            </button>
                        )}
                    </div>
                )}
            </div>

        </div>
    );
}
