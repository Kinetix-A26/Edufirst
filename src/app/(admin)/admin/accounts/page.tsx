"use client";
import React, { useState } from 'react';
import {
    Users,
    GraduationCap,
    Search,
    Plus,
    Upload,
    MoreVertical,
    Key,
    Trash2,
    Filter,
    Star,
    ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AccountCreationModal } from '@/components/admin/AccountCreationModal';
import { CSVImportModule } from '@/components/admin/CSVImportModule';
import { Toast } from '@/components/notifications/Toast';

const teacherAccounts = [
    { id: 't1', name: 'M. Jean Dubois', email: 'j.dubois@edu.com', subject: 'Mathématiques', status: 'Actif' },
    { id: 't2', name: 'Mme Marie Curie', email: 'm.curie@edu.com', subject: 'Physique', status: 'Actif' },
    { id: 't3', name: 'M. Victor Hugo', email: 'v.hugo@edu.com', subject: 'Français', status: 'Inactif' },
];

const studentAccounts = [
    { id: 's1', name: 'Léo Petit', email: 'l.petit@edu.com', class: '3ème Scientifique A', parent: 'M. Petit Jean' },
    { id: 's2', name: 'Sarah Bernard', email: 's.bernard@edu.com', class: '4ème Littéraire B', parent: 'Mme Bernard' },
    { id: 's3', name: 'Paul Valéry', email: 'p.valery@edu.com', class: '6ème C', parent: 'M. Valéry' },
];

export default function AdminAccountsPage() {
    const [activeTab, setActiveTab] = useState<'teachers' | 'students'>('teachers');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showImportModule, setShowImportModule] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleResetPassword = (email: string) => {
        setToastMessage(`Un lien de réinitialisation a été envoyé à ${email}`);
        setShowToast(true);
    };

    const handleActionComplete = (msg: string) => {
        setToastMessage(msg);
        setShowToast(true);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header with Actions */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">Gestion des Comptes</h1>
                        <p className="text-slate-500 font-medium mt-1">Créez et administrez les accès des utilisateurs.</p>
                    </div>

                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <button
                            onClick={() => setShowImportModule(true)}
                            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-3 rounded-edu-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm"
                        >
                            <Upload className="w-4 h-4 text-edu-primary" />
                            Importer CSV
                        </button>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#9156FF] text-white px-5 py-3 rounded-edu-xl font-bold text-sm hover:bg-[#7b42ea] transition-all shadow-lg shadow-indigo-100"
                        >
                            <Plus className="w-4 h-4" />
                            Nouveau Compte
                        </button>
                    </div>
                </div>

                {/* Custom Tabs */}
                <div className="flex border-b border-slate-200 mb-8 gap-8">
                    <button
                        onClick={() => setActiveTab('teachers')}
                        className={`pb-4 px-2 text-sm font-black transition-all relative flex items-center gap-2 ${activeTab === 'teachers' ? 'text-edu-primary' : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        <Users className="w-4 h-4" />
                        Enseignants
                        {activeTab === 'teachers' && (
                            <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-edu-primary rounded-full" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('students')}
                        className={`pb-4 px-2 text-sm font-black transition-all relative flex items-center gap-2 ${activeTab === 'students' ? 'text-edu-primary' : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        <GraduationCap className="w-4 h-4" />
                        Élèves & Parents
                        {activeTab === 'students' && (
                            <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-edu-primary rounded-full" />
                        )}
                    </button>
                </div>

                {/* List Section */}
                <div className="bg-white rounded-edu-xl border border-slate-100 shadow-sm overflow-hidden">
                    {/* Table Header / Filter */}
                    <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row gap-4 justify-between bg-slate-50/30">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Rechercher par nom ou email..."
                                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-edu-primary/10 transition-all font-medium"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-500 hover:text-edu-text-main transition-colors border border-slate-200 rounded-lg bg-white">
                            <Filter className="w-4 h-4" /> Filtrer
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100 font-black text-[10px] uppercase text-slate-400 tracking-widest px-8">
                                    <th className="px-8 py-5">Utilisateur</th>
                                    <th className="px-8 py-5">{activeTab === 'teachers' ? 'Matière' : 'Classe / Parent'}</th>
                                    <th className="px-8 py-5">Statut</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {(activeTab === 'teachers' ? teacherAccounts : studentAccounts).map((user: any) => (
                                    <tr key={user.id} className="group hover:bg-slate-50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-edu-primary border border-white group-hover:bg-white transition-colors">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-edu-text-main">{user.name}</p>
                                                    <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            {activeTab === 'teachers' ? (
                                                <span className="text-sm font-bold text-slate-600">{user.subject}</span>
                                            ) : (
                                                <div>
                                                    <p className="text-sm font-bold text-indigo-600">{user.class}</p>
                                                    <p className="text-[10px] uppercase font-black text-slate-400 mt-0.5">{user.parent}</p>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-8 py-5">
                                            {user.status === 'Actif' || !user.status ? (
                                                <span className="inline-flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-black uppercase">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                                    Actif
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full text-[10px] font-black uppercase">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                                                    Inactif
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => {
                                                        const randomPass = Math.random().toString(36).slice(-8).toUpperCase();
                                                        setToastMessage(`Nouveaux identifiants pour ${user.name} : ${user.email} / ${randomPass}`);
                                                        setShowToast(true);
                                                    }}
                                                    title="Générer identifiants temporaires"
                                                    className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all"
                                                >
                                                    <Key className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setToastMessage(`Réinitialisation forcée effectuée pour ${user.name}`);
                                                        setShowToast(true);
                                                    }}
                                                    title="Réinitialisation forcée"
                                                    className="p-2 text-slate-400 hover:text-edu-primary hover:bg-indigo-50 rounded-lg transition-all"
                                                >
                                                    <ShieldCheck className="w-4 h-4" />
                                                </button>
                                                <button
                                                    title="Supprimer"
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-slate-800 rounded-lg">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-6 border-t border-slate-50 bg-slate-50/10 flex justify-between items-center">
                        <p className="text-xs font-bold text-slate-400">Affichage de {activeTab === 'teachers' ? teacherAccounts.length : studentAccounts.length} utilisateurs</p>
                        <div className="flex gap-2">
                            <button disabled className="px-3 py-1 bg-slate-100 text-slate-400 rounded-md text-xs font-bold">1</button>
                            <button className="px-3 py-1 hover:bg-slate-100 text-slate-600 rounded-md text-xs font-bold">2</button>
                        </div>
                    </div>
                </div>
            </div>

            <AccountCreationModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSuccess={(data) => handleActionComplete(`Compte de ${data.name} créé avec succès.`)}
                type={activeTab === 'teachers' ? 'teacher' : 'student'}
            />

            {showImportModule && (
                <CSVImportModule
                    onClose={() => setShowImportModule(false)}
                    onImport={(data) => handleActionComplete(`${data.length} utilisateurs mis en file d'attente pour importation.`)}
                />
            )}

            <Toast
                isVisible={showToast}
                message={toastMessage}
                type="success"
                onClose={() => setShowToast(false)}
            />
        </div>
    );
}
