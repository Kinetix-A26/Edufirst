"use client";
import React, { useState } from 'react';
import {
    BookOpen,
    Plus,
    FileText,
    Video,
    HelpCircle,
    ChevronRight,
    Users,
    AlertCircle
} from 'lucide-react';
import { Toast } from '@/components/notifications/Toast';

const chapters = [
    {
        id: 'ch1',
        title: 'Chapitre 1 : Algèbre Linéaire',
        resources: [
            { id: '1', name: 'Matrices et Déterminants.pdf', type: 'pdf', status: 'published' },
            { id: '2', name: 'Vidéo : Espaces Vectoriels', type: 'video', status: 'published' },
        ]
    },
    {
        id: 'ch2',
        title: 'Chapitre 2 : Analyse Complexe',
        resources: [
            { id: '3', name: 'Cours Introduction.pdf', type: 'pdf', status: 'published' },
            { id: '4', name: 'Quiz de révision', type: 'quiz', status: 'draft' },
        ]
    }
];

export default function ProfCoursesPage() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [isUrgent, setIsUrgent] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleAddResource = (e: React.FormEvent) => {
        e.preventDefault();
        setShowToast(true);
        setShowAddForm(false);
        setIsUrgent(false);
    };

    const ResourceIcon = ({ type }: { type: string }) => {
        switch (type) {
            case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
            case 'video': return <Video className="w-5 h-5 text-blue-500" />;
            case 'quiz': return <HelpCircle className="w-5 h-5 text-green-500" />;
            default: return <FileText className="w-5 h-5 text-slate-500" />;
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-edu-text-main">Ma Bibliothèque de Cours</h1>
                    <p className="text-muted-text mt-1">Gérez vos ressources et publiez de nouveaux chapitres.</p>
                </div>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-2 bg-edu-primary hover:bg-edu-primary/90 text-white px-5 py-2.5 rounded-edu-xl font-bold transition-all shadow-md active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Ajouter une ressource
                </button>
            </div>

            <div className="grid gap-8">
                {chapters.map((chapter) => (
                    <div key={chapter.id} className="bg-white rounded-edu-xl border border-edu-border shadow-sm overflow-hidden">
                        <div className="bg-slate-50 p-4 border-b border-edu-border flex justify-between items-center">
                            <h2 className="font-bold text-lg text-edu-text-main flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-edu-primary" />
                                {chapter.title}
                            </h2>
                            <span className="text-xs font-medium text-muted-text">{chapter.resources.length} ressources</span>
                        </div>
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {chapter.resources.map((res) => (
                                <div key={res.id} className="group p-4 rounded-edu-xl border border-slate-100 hover:border-edu-primary/30 hover:shadow-md transition-all cursor-pointer bg-white">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-lg bg-slate-50 group-hover:bg-edu-primary/5 transition-colors">
                                            <ResourceIcon type={res.type} />
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="font-bold text-sm text-edu-text-main truncate">{res.name}</p>
                                            <p className="text-[10px] uppercase font-bold tracking-wider text-muted-text mt-1">{res.type}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-edu-primary transition-colors" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Add Modal */}
            {showAddForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowAddForm(false)}></div>
                    <div className="relative bg-white w-full max-w-md rounded-edu-xl shadow-2xl border border-edu-border overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-edu-border">
                            <h3 className="text-xl font-bold text-edu-text-main">Nouvelle Ressource</h3>
                            <p className="text-sm text-muted-text">Téléchargez un document pour vos classes.</p>
                        </div>
                        <form onSubmit={handleAddResource} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-edu-text-main mb-2">Titre du document</label>
                                <input required type="text" placeholder="Ex: Exercices de probabilités" className="w-full px-4 py-2 border border-edu-border rounded-lg focus:outline-none focus:ring-2 focus:ring-edu-primary/20 transition-all" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-edu-text-main mb-2">Classe</label>
                                    <select className="w-full px-4 py-2 border border-edu-border rounded-lg focus:outline-none bg-white">
                                        <option>Classe A (Terminale)</option>
                                        <option>Classe B (Première)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-edu-text-main mb-2">Type</label>
                                    <select className="w-full px-4 py-2 border border-edu-border rounded-lg focus:outline-none bg-white">
                                        <option>PDF</option>
                                        <option>Vidéo</option>
                                        <option>Quiz</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${isUrgent ? 'bg-red-100 text-red-600' : 'bg-slate-200 text-slate-500'}`}>
                                        <AlertCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-edu-text-main">Marquer comme Urgent</p>
                                        <p className="text-[11px] text-muted-text">Alerte prioritaire pour les élèves</p>
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary"
                                    checked={isUrgent}
                                    onChange={(e) => setIsUrgent(e.target.checked)}
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAddForm(false)}
                                    className="flex-1 px-4 py-2.5 border border-edu-border rounded-lg font-bold text-sm hover:bg-slate-50 transition-all"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2.5 bg-edu-primary text-white rounded-lg font-bold text-sm hover:bg-edu-primary/90 transition-all"
                                >
                                    Publier
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Toast
                isVisible={showToast}
                message="Ressource publiée avec succès ! Notification push envoyée aux élèves."
                type="success"
                onClose={() => setShowToast(false)}
            />
        </div>
    );
}
