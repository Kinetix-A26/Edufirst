"use client";
import React, { useState } from 'react';
import { X, Key, User, Mail, Shield, Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccountCreationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (userData: any) => void;
    type: 'teacher' | 'student';
}

export const AccountCreationModal = ({ isOpen, onClose, onSuccess, type }: AccountCreationModalProps) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: type === 'teacher' ? 'Enseignant' : 'Élève',
        password: ''
    });

    const generatePassword = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01233456789!@#$%^&*";
        let pass = "";
        for (let i = 0; i < 10; i++) {
            pass += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setFormData(prev => ({ ...prev, password: pass }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1) {
            generatePassword();
            setStep(2);
        } else {
            onSuccess(formData);
            handleClose();
        }
    };

    const handleClose = () => {
        setStep(1);
        setFormData({ name: '', email: '', role: type === 'teacher' ? 'Enseignant' : 'Élève', password: '' });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        onClick={handleClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-white w-full max-w-md rounded-edu-xl shadow-2xl overflow-hidden border border-edu-border"
                    >
                        <div className="p-6 border-b border-edu-border flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-xl font-black text-edu-text-main">
                                    {step === 1 ? 'Nouveau Compte' : 'Compte Créé !'}
                                </h3>
                                <p className="text-xs text-muted-text font-bold uppercase tracking-wider mt-0.5">
                                    {type === 'teacher' ? 'Espace Enseignant' : 'Espace Élève / Parent'}
                                </p>
                            </div>
                            <button onClick={handleClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            {step === 1 ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-edu-text-main mb-1.5 flex items-center gap-2">
                                            <User className="w-4 h-4 text-edu-primary" /> Nom complet
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Ex: Jean Dupont"
                                            className="w-full px-4 py-2.5 border border-edu-border rounded-lg focus:outline-none focus:ring-2 focus:ring-edu-primary/10 transition-all font-medium text-sm"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-edu-text-main mb-1.5 flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-edu-primary" /> Adresse Email
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="j.dupont@ecole.com"
                                            className="w-full px-4 py-2.5 border border-edu-border rounded-lg focus:outline-none focus:ring-2 focus:ring-edu-primary/10 transition-all font-medium text-sm"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-lg flex gap-3">
                                        <Shield className="w-5 h-5 text-edu-primary shrink-0 mt-0.5" />
                                        <p className="text-xs text-indigo-900 leading-relaxed font-medium">
                                            Un mot de passe temporaire sera généré automatiquement à l&apos;étape suivante.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6 flex flex-col items-center py-4">
                                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                                        <Check className="w-8 h-8 text-emerald-600" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-slate-600">Mot de passe temporaire généré :</p>
                                        <div className="mt-2 p-4 bg-slate-900 rounded-xl relative group cursor-pointer w-64 mx-auto">
                                            <code className="text-[#9156FF] font-black text-xl tracking-widest">{formData.password}</code>
                                            <button
                                                type="button"
                                                onClick={() => navigator.clipboard.writeText(formData.password)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-[10px] text-red-500 font-bold mt-4 uppercase">Attention : Ce mot de passe ne s&apos;affichera plus.</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3 mt-8">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="flex-1 px-4 py-3 border border-edu-border rounded-lg font-bold text-sm hover:bg-slate-50 transition-all"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 bg-[#9156FF] text-white rounded-lg font-bold text-sm hover:bg-[#7b42ea] transition-all shadow-lg shadow-indigo-100"
                                >
                                    {step === 1 ? 'Générer l\'accès' : 'Terminer'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
