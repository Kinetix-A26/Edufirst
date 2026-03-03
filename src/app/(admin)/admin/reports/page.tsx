"use client";
import React, { useState } from 'react';
import {
    TrendingUp,
    BarChart3,
    Package,
    Download,
    ArrowUpRight,
    ArrowDownRight,
    ShieldCheck,
    Smartphone,
    BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Toast } from '@/components/notifications/Toast';

const financialData = [
    { category: 'Abonnements', actual: 5240, forecast: 5000, color: 'bg-indigo-500' },
    { category: 'Boutique', actual: 1420, forecast: 1367, color: 'bg-emerald-500' },
    { category: 'Cours Premium', actual: 1100, forecast: 1200, color: 'bg-amber-500' },
];

const academicData = [
    { level: '6ème', average: 14.5, count: 120 },
    { level: '5ème', average: 13.8, count: 115 },
    { level: '4ème', average: 15.2, count: 108 },
    { level: '3ème', average: 12.9, count: 95 },
    { level: 'Lycée', average: 14.1, count: 210 },
];

const inventoryData = [
    { item: 'Tablettes Éducatives', stock: 42, status: 'Optimal', icon: Smartphone },
    { item: 'Kits Fournitures', stock: 15, status: 'Critique', icon: Package },
    { item: 'Livres Scolaires', stock: 156, status: 'Optimal', icon: BookOpen },
];

export default function AdminReportsPage() {
    const [showToast, setShowToast] = useState(false);

    const handleGenerateReport = () => {
        setShowToast(true);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">Rapports de Synthèse</h1>
                    <p className="text-slate-500 font-medium mt-1">Analyse globale de performance - Mars 2026</p>
                </div>
                <button
                    onClick={handleGenerateReport}
                    className="flex items-center gap-3 bg-[#9156FF] hover:bg-[#7b42ea] text-white px-6 py-4 rounded-edu-xl font-bold transition-all shadow-xl shadow-indigo-200 active:scale-95"
                >
                    <Download className="w-5 h-5" />
                    Générer le Rapport Mensuel
                </button>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Financial Section */}
                <div className="lg:col-span-8 space-y-8">
                    <section className="bg-white rounded-edu-xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                            <h2 className="text-lg font-black text-[#0F172A] flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-[#9156FF]" />
                                Performances Financières
                            </h2>
                            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">Réel vs Business Model</span>
                        </div>
                        <div className="p-8">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left border-b border-slate-100">
                                            <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Catégorie</th>
                                            <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Forecast BM</th>
                                            <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Réel</th>
                                            <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Écart</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {financialData.map((item) => {
                                            const diff = item.actual - item.forecast;
                                            const isPositive = diff >= 0;
                                            return (
                                                <tr key={item.category} className="group hover:bg-slate-50/50 transition-colors">
                                                    <td className="py-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-2 h-8 rounded-full ${item.color}`}></div>
                                                            <span className="font-bold text-[#0F172A]">{item.category}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-5 font-bold text-slate-500">${item.forecast.toLocaleString()}</td>
                                                    <td className="py-5 font-black text-[#0F172A]">${item.actual.toLocaleString()}</td>
                                                    <td className="py-5 text-right">
                                                        <span className={`inline-flex items-center gap-1 font-black text-sm ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                                                            {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                                            {Math.abs((diff / item.forecast) * 100).toFixed(1)}%
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    {/* Academic Performance */}
                    <section className="bg-white rounded-edu-xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                            <h2 className="text-lg font-black text-[#0F172A] flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-[#9156FF]" />
                                Progression Académique par Niveau
                            </h2>
                        </div>
                        <div className="p-8">
                            <div className="flex items-end justify-between h-48 gap-4 px-4">
                                {academicData.map((data) => (
                                    <div key={data.level} className="flex-1 flex flex-col items-center group">
                                        <div className="relative w-full flex flex-col items-center justify-end h-full">
                                            {/* Tooltip on hover */}
                                            <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0F172A] text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap z-10">
                                                Moy: {data.average}/20
                                            </div>
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${(data.average / 20) * 100}%` }}
                                                className="w-full max-w-[40px] bg-indigo-100 group-hover:bg-[#9156FF] rounded-t-lg transition-colors relative"
                                            >
                                                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-black text-[#9156FF] group-hover:text-white">
                                                    {data.average}
                                                </div>
                                            </motion.div>
                                        </div>
                                        <span className="text-xs font-bold text-slate-400 mt-4 uppercase tracking-tighter">{data.level}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-50 flex justify-around">
                                <div className="text-center">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Taux de Réussite</p>
                                    <p className="text-xl font-black text-[#0F172A]">94.2%</p>
                                </div>
                                <div className="text-center border-x border-slate-100 px-10">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Moyenne Globale</p>
                                    <p className="text-xl font-black text-indigo-600">14.1</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Écart Type</p>
                                    <p className="text-xl font-black text-[#0F172A]">1.2</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Inventory Section (Right Sidebar Style) */}
                <div className="lg:col-span-4 space-y-8">
                    <section className="bg-white rounded-edu-xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                            <h3 className="text-lg font-black text-[#0F172A] flex items-center gap-2">
                                <Package className="w-5 h-5 text-amber-500" />
                                État de l&apos;Inventaire
                            </h3>
                        </div>
                        <div className="p-6 space-y-4">
                            {inventoryData.map((item) => (
                                <div key={item.item} className="p-4 rounded-xl border border-slate-50 hover:border-slate-100 transition-all bg-slate-50/30">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-lg bg-white shadow-sm text-slate-500">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-[#0F172A]">{item.item}</p>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-xs font-medium text-slate-500">Stock: <strong className="text-[#0F172A]">{item.stock}</strong></span>
                                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${item.status === 'Critique' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full py-3 text-sm font-bold text-slate-500 hover:text-[#9156FF] bg-slate-50 hover:bg-indigo-50 rounded-lg transition-all border border-transparent hover:border-indigo-100 flex items-center justify-center gap-2">
                                Commander des fournitures
                            </button>
                        </div>
                    </section>

                    {/* Business Intelligence Summary */}
                    <section className="bg-gradient-to-br from-[#9156FF] to-[#7b42ea] rounded-edu-xl p-6 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
                        <div className="relative z-10">
                            <ShieldCheck className="w-8 h-8 mb-4 opacity-50" />
                            <h3 className="text-xl font-black mb-2 leading-tight">Santé de l&apos;Établissement</h3>
                            <p className="text-sm text-white/80 font-medium leading-relaxed">
                                Les indicateurs financiers et pédagogiques montrent une croissance de 12% par rapport au trimestre précédent.
                            </p>
                            <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Satisfaction Admin</p>
                                    <p className="text-lg font-black italic">Excellent</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">ROI Prévu</p>
                                    <p className="text-lg font-black">18.4%</p>
                                </div>
                            </div>
                        </div>
                        {/* Background pattern */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full transform translate-x-10 -translate-y-10"></div>
                    </section>
                </div>
            </div>

            <Toast
                isVisible={showToast}
                message="Rapport de synthèse généré ! Le téléchargement du fichier PDF commencera dans un instant."
                type="success"
                onClose={() => setShowToast(false)}
            />
        </div>
    );
}
