"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, School, User, Mail, Lock, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        schoolName: '',
        city: '',
        address: '',
        logo: null as File | null,
        adminName: '',
        email: '',
        password: '',
    });

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setStep(3); // Success step

        setTimeout(() => {
            router.push('/admin/dashboard');
        }, 3000);
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, logo: e.target.files[0] });
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 font-sans">
            <div className="max-w-md w-full">
                {/* Brand Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[#9156FF] rounded-xl text-white shadow-lg mb-4">
                        <School className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">EduFirst</h2>
                    <p className="text-slate-500 font-medium mt-1 uppercase text-[10px] tracking-widest">Configuration de l&apos;établissement</p>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 relative overflow-hidden">
                    {/* Stepper Progress */}
                    {step < 3 && (
                        <div className="flex justify-between items-center mb-10 px-2">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex items-center flex-1 last:flex-none">
                                    <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${step >= i ? 'bg-[#9156FF] text-white shadow-lg shadow-[#9156FF]/20' : 'bg-slate-100 text-slate-400'
                                        }`}>
                                        {step > i ? <CheckCircle2 className="w-6 h-6" /> : i}
                                    </div>
                                    {i === 1 && (
                                        <div className="h-0.5 flex-1 mx-4 bg-slate-100 relative">
                                            <motion.div
                                                initial={{ width: "0%" }}
                                                animate={{ width: step > 1 ? "100%" : "0%" }}
                                                className="absolute inset-0 bg-[#9156FF]"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <h1 className="text-2xl font-black text-slate-900">Identité École</h1>
                                        <p className="text-slate-500 text-sm font-medium">Informations générales de votre établissement.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:border-[#9156FF] transition-colors cursor-pointer group bg-slate-50/50">
                                            <input type="file" className="hidden" id="logo-upload" onChange={handleLogoChange} accept="image/*" />
                                            <label htmlFor="logo-upload" className="flex flex-col items-center cursor-pointer">
                                                {formData.logo ? (
                                                    <div className="flex items-center gap-2 text-[#9156FF] font-bold text-sm">
                                                        <CheckCircle2 className="w-5 h-5" />
                                                        {formData.logo.name.length > 20 ? formData.logo.name.substring(0, 20) + '...' : formData.logo.name}
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform mb-2 text-slate-400 group-hover:text-[#9156FF]">
                                                            <Upload className="w-5 h-5" />
                                                        </div>
                                                        <span className="text-xs font-bold text-slate-400 group-hover:text-slate-600 uppercase tracking-wider text-center">Logo de l&apos;école<br /><span className="text-[10px] lowercase font-medium">(Optionnel)</span></span>
                                                    </>
                                                )}
                                            </label>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Nom de l&apos;établissement</label>
                                            <input
                                                type="text" required
                                                className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#9156FF]/5 focus:border-[#9156FF] outline-none transition-all font-medium text-sm"
                                                placeholder="Ex: Complexe Scolaire Lumière"
                                                value={formData.schoolName}
                                                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Ville</label>
                                                <input
                                                    type="text" required
                                                    className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#9156FF]/5 focus:border-[#9156FF] outline-none transition-all font-medium text-sm"
                                                    placeholder="Kinshasa"
                                                    value={formData.city}
                                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Adresse</label>
                                                <input
                                                    type="text" required
                                                    className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#9156FF]/5 focus:border-[#9156FF] outline-none transition-all font-medium text-sm"
                                                    placeholder="Gombe, Av. Lukusa"
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            type="button" onClick={handleNext}
                                            disabled={!formData.schoolName || !formData.address}
                                            className="w-full bg-[#9156FF] text-white p-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#7a3eff] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#9156FF]/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                                        >
                                            Continuer
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <h1 className="text-2xl font-black text-slate-900">Compte Maître</h1>
                                        <p className="text-slate-500 text-sm font-medium">Créez l&apos;accès administrateur souverain de l&apos;école.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Nom du Responsable</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <User className="w-4 h-4 text-slate-400" />
                                                </div>
                                                <input
                                                    type="text" required
                                                    className="w-full pl-11 p-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#9156FF]/5 focus:border-[#9156FF] outline-none transition-all font-medium text-sm"
                                                    placeholder="Nom et Prénom"
                                                    value={formData.adminName}
                                                    onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Email professionnel</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <Mail className="w-4 h-4 text-slate-400" />
                                                </div>
                                                <input
                                                    type="email" required
                                                    className="w-full pl-11 p-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#9156FF]/5 focus:border-[#9156FF] outline-none transition-all font-medium text-sm"
                                                    placeholder="admin@ecole.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Mot de passe</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <Lock className="w-4 h-4 text-slate-400" />
                                                </div>
                                                <input
                                                    type="password" required
                                                    className="w-full pl-11 p-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-[#9156FF]/5 focus:border-[#9156FF] outline-none transition-all font-medium text-sm"
                                                    placeholder="••••••••"
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl">
                                            <p className="text-[11px] text-blue-700 font-medium leading-relaxed">
                                                Note : Ce compte aura le contrôle total sur la création des accès enseignants, parents et élèves de votre établissement.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <button
                                            type="button" onClick={handleBack}
                                            className="flex-1 bg-white border border-slate-200 text-slate-600 p-4 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                                        >
                                            <ArrowLeft className="w-4 h-4" />
                                            Retour
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !formData.adminName || !formData.email || !formData.password}
                                            className="flex-[2] bg-[#9156FF] text-white p-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#7a3eff] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#9156FF]/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>Finaliser</>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center py-8 text-center"
                                >
                                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <h1 className="text-2xl font-black text-slate-900 mb-2">Configuration Réussie !</h1>
                                    <p className="text-slate-500 font-medium text-sm leading-relaxed px-4">
                                        Bienvenue Chef d&apos;établissement !<br />
                                        Votre école <span className="text-[#9156FF] font-bold">{formData.schoolName}</span> est configurée.<br />
                                        Vous allez être redirigé vers votre tableau de bord.
                                    </p>
                                    <div className="mt-8 flex items-center gap-2 text-[#9156FF] font-bold text-xs uppercase tracking-widest animate-pulse">
                                        Redirection en cours
                                        <span className="flex gap-1">
                                            <span className="w-1 h-1 bg-[#9156FF] rounded-full" />
                                            <span className="w-1 h-1 bg-[#9156FF] rounded-full" />
                                            <span className="w-1 h-1 bg-[#9156FF] rounded-full" />
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>

                {step < 3 && (
                    <div className="mt-8 text-center">
                        <p className="text-sm text-slate-400 font-medium">
                            Déjà inscrit ?{' '}
                            <Link href="/login" className="text-[#9156FF] font-bold hover:underline transition-all">
                                Se connecter à l&apos;école
                            </Link>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
