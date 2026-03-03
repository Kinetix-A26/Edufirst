"use client";
import React from 'react';
import { SiteSelector } from '../admin/SiteSelector';
import { NotificationCenter } from '../notifications/NotificationCenter';
import { Search } from 'lucide-react';

export const Header = () => {
    return (
        <header className="h-[80px] px-8 bg-white/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-40 border-b border-edu-border">
            <div className="flex items-center gap-6 flex-1">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-black text-edu-text-main whitespace-nowrap">Vue d&apos;ensemble</h1>
                    <SiteSelector />
                </div>

                <div className="hidden lg:flex relative w-64 ml-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Recherche rapide..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border-transparent rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-edu-primary/10 transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <NotificationCenter />

                <div className="flex items-center gap-3 border-l border-edu-border pl-6 ml-2">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-black text-edu-text-main">Admin EduFirst</p>
                        <p className="text-[10px] font-bold text-muted-text uppercase tracking-tighter text-edu-emerald">En ligne</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-edu-primary-light flex items-center justify-center text-edu-primary font-black border-2 border-white shadow-sm">
                        AD
                    </div>
                </div>
            </div>
        </header>
    );
};
