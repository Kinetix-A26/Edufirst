"use client";

import React, { useState } from 'react';
import {
    Plus,
    Search,
    FileUp,
    MoreHorizontal,
    Mail,
    BookOpen,
    Users,
    CheckCircle2,
    Clock,
    Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const INITIAL_TEACHERS = [
    { id: 1, name: "Jean Dupont", email: "j.dupont@ecole.fr", subject: "Mathématiques", classes: ["6ème A", "4ème B"], status: "active" },
    { id: 2, name: "Marie Curie", email: "m.curie@ecole.fr", subject: "Physique-Chimie", classes: ["3ème C", "Terminale S"], status: "inactive" },
    { id: 3, name: "Albert Einstein", email: "a.einstein@ecole.fr", subject: "Physique", classes: ["1ère S", "Terminale S"], status: "active" },
    { id: 4, name: "Victor Hugo", email: "v.hugo@ecole.fr", subject: "Français", classes: ["2nde A", "L"], status: "active" },
    { id: 5, name: "Simone de Beauvoir", email: "s.beauvoir@ecole.fr", subject: "Philosophie", classes: ["Terminale L"], status: "inactive" },
];

export default function TeachersPage() {
    const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTeacher, setNewTeacher] = useState({ name: '', email: '', subject: '' });

    const filteredTeachers = teachers.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.classes.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleAddTeacher = (e: React.FormEvent) => {
        e.preventDefault();
        const id = teachers.length + 1;
        setTeachers([...teachers, { ...newTeacher, id, classes: [], status: 'inactive' }]);
        setIsModalOpen(false);
        setNewTeacher({ name: '', email: '', subject: '' });
    };

    return (
        <div className="p-4 md:p-8 bg-edu-bg min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-edu-text-main">Gestion des Enseignants</h1>
                    <p className="text-muted-text mt-1">Gérez vos professeurs, leurs classes et leurs accès.</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        className="btn bg-white border-edu-border hover:bg-edu-soft text-edu-text-main gap-2"
                        onClick={() => alert('Fonctionnalité d\'importation bientôt disponible')}
                    >
                        <FileUp size={18} />
                        Import CSV/Excel
                    </button>
                    <button
                        className="btn bg-primary hover:bg-primary/90 text-white gap-2 border-none"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Plus size={18} />
                        Ajouter un Enseignant
                    </button>
                </div>
            </div>

            {/* Stats Quick Look (Optional/Premium Feel) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Total Profs", value: teachers.length, icon: Users, color: "text-primary" },
                    { label: "Actifs", value: teachers.filter(t => t.status === 'active').length, icon: CheckCircle2, color: "text-green-500" },
                    { label: "En attente", value: teachers.filter(t => t.status === 'inactive').length, icon: Clock, color: "text-amber-500" },
                    { label: "Matières", value: new Set(teachers.map(t => t.subject)).size, icon: BookOpen, color: "text-blue-500" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-4 rounded-edu border border-edu-border shadow-soft">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-edu-soft ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-muted-text">{stat.label}</p>
                                <p className="text-xl font-bold text-edu-text-main">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-edu-xl border border-edu-border shadow-soft mb-6">
                <div className="relative flex-1 max-w-md">
                    <span className="absolute inset-y-0 left-3 flex items-center text-muted-text">
                        <Search size={18} />
                    </span>
                    <input
                        type="text"
                        placeholder="Rechercher par nom ou classe (ex: 6ème A)..."
                        className="input w-full pl-10 bg-edu-soft border-none focus:ring-2 focus:ring-primary/20"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Teachers Table */}
            <div className="bg-white rounded-edu-xl border border-edu-border shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-edu-soft/50 text-edu-text-main border-b border-edu-border">
                                <th className="font-semibold">Nom & Email</th>
                                <th className="font-semibold">Spécialité</th>
                                <th className="font-semibold">Classes</th>
                                <th className="font-semibold">Statut Compte</th>
                                <th className="font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-edu-border">
                            {filteredTeachers.map((teacher) => (
                                <tr key={teacher.id} className="hover:bg-edu-soft/30 transition-colors">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar placeholder">
                                                <div className="bg-primary-light text-primary rounded-full w-10">
                                                    <span className="text-sm font-bold">{teacher.name.split(' ').map(n => n[0]).join('')}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-edu-text-main">{teacher.name}</div>
                                                <div className="text-sm text-muted-text flex items-center gap-1">
                                                    <Mail size={12} /> {teacher.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium border border-blue-100">
                                            {teacher.subject}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex flex-wrap gap-1">
                                            {teacher.classes.length > 0 ? (
                                                teacher.classes.map((cls, idx) => (
                                                    <span key={idx} className="px-2 py-0.5 rounded bg-edu-soft text-edu-text-main text-[10px] font-semibold">
                                                        {cls}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-xs italic text-muted-text">Aucune classe</span>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        {teacher.status === 'active' ? (
                                            <div className="flex items-center gap-1.5 text-green-600 font-medium text-sm">
                                                <CheckCircle2 size={16} /> Compte Activé
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-amber-600 font-medium text-sm">
                                                <Clock size={16} /> En attente
                                            </div>
                                        )}
                                    </td>
                                    <td className="text-right">
                                        <button className="btn btn-ghost btn-sm text-muted-text hover:text-primary">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredTeachers.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="bg-edu-soft w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-muted-text">
                            <Search size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-edu-text-main">Aucun enseignant trouvé</h3>
                        <p className="text-muted-text">Essayez avec un autre terme ou ajoutez un nouveau profil.</p>
                    </div>
                )}
            </div>

            {/* Add Teacher Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-edu-xl shadow-2xl w-full max-w-md overflow-hidden"
                        >
                            <div className="p-6 border-b border-edu-border flex justify-between items-center">
                                <h2 className="text-xl font-bold text-edu-text-main">Ajouter un Enseignant</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-muted-text hover:text-edu-text-main">
                                    <Plus className="rotate-45" size={24} />
                                </button>
                            </div>
                            <form onSubmit={handleAddTeacher} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-edu-text-main mb-1.5">Nom Complet</label>
                                    <input
                                        type="text"
                                        required
                                        className="input w-full bg-edu-soft border-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="ex: Dr. Sarah Martin"
                                        value={newTeacher.name}
                                        onChange={e => setNewTeacher({ ...newTeacher, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-edu-text-main mb-1.5">Adresse Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="input w-full bg-edu-soft border-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="s.martin@ecole.fr"
                                        value={newTeacher.email}
                                        onChange={e => setNewTeacher({ ...newTeacher, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-edu-text-main mb-1.5">Spécialité / Discipline</label>
                                    <select
                                        required
                                        className="select w-full bg-edu-soft border-none focus:ring-2 focus:ring-primary/20"
                                        value={newTeacher.subject}
                                        onChange={e => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                                    >
                                        <option value="">Sélectionner une matière</option>
                                        <option value="Mathématiques">Mathématiques</option>
                                        <option value="Français">Français</option>
                                        <option value="Physique-Chimie">Physique-Chimie</option>
                                        <option value="Anglais">Anglais</option>
                                        <option value="Histoire-Géo">Histoire-Géo</option>
                                        <option value="SVT">SVT</option>
                                    </select>
                                </div>
                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="button"
                                        className="btn flex-1 bg-edu-soft hover:bg-edu-border text-edu-text-main border-none"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn flex-1 bg-primary hover:bg-primary/90 text-white border-none"
                                    >
                                        Créer le compte
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
