"use client";

import React, { useState } from 'react';
import { FileText, Send, CheckCircle2, ChevronDown, ListFilter, AlignLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProfReportsPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        classe: '6ème Scientifique A',
        climat: 'Productif',
        observations: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.observations.trim()) return;

        setIsSubmitting(true);

        // Simulate generation and sending delay
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);

            // Reset after showing success animation
            setTimeout(() => {
                setIsSuccess(false);
                setFormData(prev => ({ ...prev, observations: '' }));
            }, 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-[#0B1120]">

            {/* Header - Minimalist */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/prof/dashboard"
                            className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            &larr; <span className="sr-only">Retour au tableau de bord</span>
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <FileText className="w-5 h-5 text-[#9156FF]" />
                                Rapport Journalier
                            </h1>
                        </div>
                    </div>
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                        Brouillon
                    </span>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

                {/* Main Form - Productivity focused */}
                <div className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden relative">

                    {/* Success Overlay Animation */}
                    {isSuccess && (
                        <div className="absolute inset-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300">
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-500/20 animate-bounce">
                                <CheckCircle2 className="w-10 h-10 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Rapport Généré avec Succès !</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm">
                                Le format PDF a été créé et envoyé automatiquement à l&apos;administration et aux parents concernés.
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="divide-y divide-gray-100 dark:divide-gray-800">

                        {/* Quick Selectors Section */}
                        <div className="p-6 md:p-8 bg-gray-50/50 dark:bg-gray-800/20">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Class Selector */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
                                        <ListFilter className="w-4 h-4 text-gray-400" />
                                        Classe concernée
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={formData.classe}
                                            onChange={(e) => setFormData({ ...formData, classe: e.target.value })}
                                            className="block w-full pl-4 pr-10 py-3 text-base border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9156FF] focus:border-[#9156FF] appearance-none shadow-sm transition-shadow"
                                        >
                                            <option>6ème Scientifique A</option>
                                            <option>5ème Littéraire B</option>
                                            <option>Terminale Maths C</option>
                                            <option>4ème Générale A</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Climate Selector */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Climat de classe (Général)
                                    </label>
                                    <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
                                        {['Calme', 'Agité', 'Productif'].map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, climat: option })}
                                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${formData.climat === option
                                                    ? 'bg-white dark:bg-gray-700 text-[#9156FF] shadow-sm ring-1 ring-gray-200 dark:ring-gray-600'
                                                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="p-6 md:p-8">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1.5">
                                <AlignLeft className="w-4 h-4 text-gray-400" />
                                Observations du jour
                            </label>

                            <div className="relative rounded-xl border border-gray-300 dark:border-gray-700 shadow-sm focus-within:ring-2 focus-within:ring-[#9156FF] focus-within:border-[#9156FF] transition-all bg-white dark:bg-gray-900">
                                <textarea
                                    required
                                    value={formData.observations}
                                    onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                                    rows={8}
                                    placeholder="Notez les incidents, participations remarquables, ou le déroulement général du cours..."
                                    className="block w-full border-0 bg-transparent py-4 px-4 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-0 sm:text-base resize-y min-h-[150px]"
                                />

                                {/* Format toolbar mock */}
                                <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
                                    <div className="flex items-center gap-1 text-gray-400">
                                        <button type="button" className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white rounded transition-colors font-bold">B</button>
                                        <button type="button" className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white rounded transition-colors italic">I</button>
                                        <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                                        <button type="button" className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white rounded transition-colors flex items-center gap-1 text-xs px-2">Insérer un modèle</button>
                                    </div>
                                    <span className="text-xs text-gray-400 font-medium">
                                        {formData.observations.length} caractères
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Footer */}
                        <div className="px-6 py-5 md:px-8 bg-gray-50/80 dark:bg-gray-800/30 flex items-center justify-between flex-row-reverse">
                            <button
                                type="submit"
                                disabled={isSubmitting || !formData.observations.trim()}
                                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${isSubmitting || !formData.observations.trim()
                                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed shadow-none'
                                    : 'bg-[#9156FF] hover:bg-[#7b42ea] hover:shadow-[#9156FF]/30 hover:-translate-y-0.5 active:translate-y-0'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Génération PDF...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Générer & Envoyer Rapport PDF
                                    </>
                                )}
                            </button>

                            <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                                Enregistrer le brouillon
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
}
