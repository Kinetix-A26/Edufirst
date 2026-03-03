"use client";

import React from 'react';
import {
    CreditCard,
    TrendingUp,
    ShoppingBag,
    BookOpen,
    Plus,
    Download,
    Filter,
    CheckCircle2,
    Clock,
    ArrowUpRight,
    Target
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Data for Analytics
const REVENUE_DATA = [
    { category: "Abonnements", amount: 45000, color: "bg-primary", icon: CreditCard, percentage: 60 },
    { category: "Boutique", amount: 18750, color: "bg-blue-500", icon: ShoppingBag, percentage: 25 },
    { category: "Cours", amount: 11250, color: "bg-indigo-400", icon: BookOpen, percentage: 15 },
];

const RECENT_TRANSACTIONS = [
    { id: "TRX-001", student: "Sophie Martin", item: "Frais de scolarité - T2", amount: "450 €", date: "03 Mars 2026", status: "paid" },
    { id: "TRX-002", student: "Lucas Bernard", item: "Uniforme complet", amount: "85 €", date: "02 Mars 2026", status: "pending" },
    { id: "TRX-003", student: "Emma Petit", item: "Tablette Éducative Gen 4", amount: "120 €", date: "02 Mars 2026", status: "paid" },
    { id: "TRX-004", student: "Thomas Roux", item: "Frais de scolarité - T2", amount: "450 €", date: "01 Mars 2026", status: "paid" },
    { id: "TRX-005", student: "Chloé Fontaine", item: "Pack Livres 3ème", amount: "65 €", date: "01 Mars 2026", status: "pending" },
];

export default function BillingPage() {
    const totalPaidStudents = 1450;
    const totalStudents = 2000;
    const recoveryRate = (totalPaidStudents / totalStudents) * 100;

    return (
        <div className="p-4 md:p-8 bg-edu-bg min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-edu-text-main">Facturation & Finances</h1>
                    <p className="text-muted-text mt-1">Suivez les revenus et l'état des paiements de l'établissement.</p>
                </div>

                <div className="flex gap-3">
                    <button className="btn bg-white border-edu-border hover:bg-edu-soft text-edu-text-main gap-2 h-11">
                        <Download size={18} /> exporter rapport
                    </button>
                    <button className="btn bg-primary hover:bg-primary/90 text-white gap-2 border-none h-11">
                        <Plus size={18} /> Nouveau Paiement
                    </button>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">

                {/* Revenue Analytics View */}
                <div className="xl:col-span-2 bg-white p-6 rounded-edu-xl border border-edu-border shadow-soft">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-edu-text-main">Répartition des Revenus</h2>
                        <div className="flex items-center gap-2 text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                            <TrendingUp size={16} /> +12% ce mois
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        {/* Simple Visual Chart (CSS Based) */}
                        <div className="relative w-48 h-48 shrink-0">
                            {/* Simplified Donut Chart via SVG */}
                            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#E2E8F0" strokeWidth="12" />
                                {/* Abonnements (60%) */}
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#9156FF" strokeWidth="12"
                                    strokeDasharray={`${60 * 2.51} 251`}
                                />
                                {/* Boutique (25%) */}
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="12"
                                    strokeDasharray={`${25 * 2.51} 251`}
                                    strokeDashoffset={`${-(60 * 2.51)}`}
                                />
                                {/* Cours (15%) */}
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#818CF8" strokeWidth="12"
                                    strokeDasharray={`${15 * 2.51} 251`}
                                    strokeDashoffset={`${-(85 * 2.51)}`}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-black text-edu-text-main">75k€</span>
                                <span className="text-[10px] text-muted-text uppercase font-bold">Total Mars</span>
                            </div>
                        </div>

                        <div className="flex-1 w-full space-y-4">
                            {REVENUE_DATA.map((item, idx) => (
                                <div key={idx} className="space-y-1.5">
                                    <div className="flex justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                            <span className="font-semibold text-edu-text-main">{item.category}</span>
                                        </div>
                                        <span className="font-bold text-edu-text-main">{item.amount.toLocaleString()} €</span>
                                    </div>
                                    <div className="w-full h-2 bg-edu-bg rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.percentage}%` }}
                                            className={`h-full ${item.color}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recovery Indicator Widget */}
                <div className="bg-white p-6 rounded-edu-xl border border-edu-border shadow-soft flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-primary/10 text-primary rounded-lg">
                                <Target size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-edu-text-main">Recouvrement</h2>
                        </div>

                        <p className="text-sm text-muted-text mb-6">
                            Objectif trimestriel : 100% des élèves (2000). État actuel des paiements reçus.
                        </p>

                        <div className="relative pt-4 text-center">
                            <div className="radial-progress text-primary mx-auto" style={{ "--value": recoveryRate, "--size": "10rem", "--thickness": "0.8rem" } as any} role="progressbar">
                                <div className="flex flex-col">
                                    <span className="text-3xl font-black text-edu-text-main">{recoveryRate.toFixed(1)}%</span>
                                    <span className="text-[10px] text-muted-text font-bold uppercase tracking-widest">Atteint</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-edu-bg rounded-lg space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-text">Élèves ayant payé</span>
                            <span className="font-bold text-edu-text-main">{totalPaidStudents}</span>
                        </div>
                        <div className="flex justify-between text-sm border-t border-edu-border pt-2">
                            <span className="text-muted-text">Reste à recouvrer</span>
                            <span className="font-bold text-amber-600">{totalStudents - totalPaidStudents}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Transactions Table */}
            <div className="bg-white rounded-edu-xl border border-edu-border shadow-soft overflow-hidden">
                <div className="p-6 border-b border-edu-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="text-xl font-bold text-edu-text-main">Transactions Récentes</h2>
                    <div className="flex gap-2">
                        <button className="btn btn-sm bg-edu-bg border-edu-border text-edu-text-main hover:bg-edu-soft gap-2">
                            <Filter size={14} /> Filtres
                        </button>
                        <div className="join border border-edu-border">
                            <button className="join-item btn btn-xs bg-primary text-white border-none px-4">Toutes</button>
                            <button className="join-item btn btn-xs bg-white text-edu-text-main border-none px-4 hover:bg-edu-soft">Paiements</button>
                            <button className="join-item btn btn-xs bg-white text-edu-text-main border-none px-4 hover:bg-edu-soft">E-Shop</button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-edu-soft/50 text-edu-text-main border-b border-edu-border">
                                <th className="font-bold">Transaction ID</th>
                                <th className="font-bold">Élève / Client</th>
                                <th className="font-bold">Désignation</th>
                                <th className="font-bold text-center">Date</th>
                                <th className="font-bold text-right">Montant</th>
                                <th className="font-bold text-center">Statut</th>
                                <th className="font-bold text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-edu-border">
                            {RECENT_TRANSACTIONS.map((trx, idx) => (
                                <tr key={idx} className="hover:bg-edu-soft/30 transition-colors">
                                    <td className="font-mono text-xs text-muted-text">{trx.id}</td>
                                    <td>
                                        <div className="font-bold text-edu-text-main">{trx.student}</div>
                                    </td>
                                    <td>
                                        <div className="text-sm font-medium text-edu-text-main">{trx.item}</div>
                                    </td>
                                    <td className="text-center text-sm text-muted-text">{trx.date}</td>
                                    <td className="text-right font-bold text-edu-text-main">{trx.amount}</td>
                                    <td className="text-center">
                                        {trx.status === 'paid' ? (
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold border border-green-100">
                                                <CheckCircle2 size={12} /> Payé
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold border border-amber-100">
                                                <Clock size={12} /> En attente
                                            </div>
                                        )}
                                    </td>
                                    <td className="text-right">
                                        <button className="btn btn-ghost btn-xs text-primary hover:bg-primary-light">
                                            <ArrowUpRight size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 bg-edu-bg/50 border-t border-edu-border text-center">
                    <button className="text-sm font-bold text-primary hover:underline">
                        Voir tout l'historique des transactions
                    </button>
                </div>
            </div>
        </div>
    );
}
