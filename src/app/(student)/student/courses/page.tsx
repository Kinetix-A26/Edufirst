"use client";
import React, { useState, useEffect } from 'react';
import {
    FileText,
    Video,
    Download,
    ExternalLink,
    Search,
    Book,
    PenTool,
    Trophy,
    History
} from 'lucide-react';
import { Toast } from '@/components/notifications/Toast';

const subjects = [
    { id: '1', name: 'Mathématiques', color: 'text-blue-600', bg: 'bg-blue-50', icon: Book, count: 12 },
    { id: '2', name: 'Français', color: 'text-purple-600', bg: 'bg-purple-50', icon: PenTool, count: 8 },
    { id: '3', name: 'Physique-Chimie', color: 'text-amber-600', bg: 'bg-amber-50', icon: History, count: 5 },
    { id: '4', name: 'Éducation Sportive', color: 'text-green-600', bg: 'bg-green-50', icon: Trophy, count: 2 },
];

const recentFiles = [
    { id: 'r1', name: 'Equations Différentielles - TD.pdf', subject: 'Maths', type: 'pdf', date: 'Aujourd\'hui' },
    { id: 'r2', name: 'Lecture : Germinal - Analyse.pdf', subject: 'Français', type: 'pdf', date: 'Hier' },
    { id: 'r3', name: 'Expérience Optique.mp4', subject: 'Physique', type: 'video', date: 'Il y a 2 jours' },
];

export default function StudentCoursesPage() {
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowWelcome(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 space-y-10">
            {/* Search & Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-edu-text-main">Mes Cours et Ressources</h1>
                    <p className="text-muted-text mt-1">Accédez à tous vos documents pédagogiques.</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Rechercher un document..."
                        className="w-full pl-10 pr-4 py-2 border border-edu-border rounded-edu-xl focus:outline-none focus:ring-2 focus:ring-edu-primary/10 bg-white"
                    />
                </div>
            </div>

            {/* Subject Grid */}
            <section>
                <h2 className="text-xl font-bold text-edu-text-main mb-6">Matières</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {subjects.map((sub) => (
                        <div key={sub.id} className="group p-6 bg-white border border-edu-border rounded-edu-xl hover:shadow-lg transition-all cursor-pointer">
                            <div className={`w-12 h-12 rounded-lg ${sub.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <sub.icon className={`w-6 h-6 ${sub.color}`} />
                            </div>
                            <h3 className="font-bold text-edu-text-main">{sub.name}</h3>
                            <p className="text-xs text-muted-text mt-1 font-medium">{sub.count} documents disponibles</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Recent Resources */}
            <section>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-edu-text-main">Dernières publications</h2>
                    <button className="text-sm font-bold text-edu-primary hover:underline transition-all">Voir tout l'historique</button>
                </div>
                <div className="bg-white border border-edu-border rounded-edu-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-edu-border">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-muted-text uppercase tracking-wider">Document</th>
                                    <th className="px-6 py-4 text-xs font-bold text-muted-text uppercase tracking-wider">Matière</th>
                                    <th className="px-6 py-4 text-xs font-bold text-muted-text uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-muted-text uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {recentFiles.map((file) => (
                                    <tr key={file.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {file.type === 'pdf' ? <FileText className="w-5 h-5 text-red-500" /> : <Video className="w-5 h-5 text-blue-500" />}
                                                <span className="font-bold text-sm text-edu-text-main">{file.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 uppercase">
                                                {file.subject}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-muted-text">
                                            {file.date}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 text-slate-400 hover:text-edu-primary hover:bg-edu-primary/5 rounded-lg transition-all" title="Télécharger">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-edu-primary hover:bg-edu-primary/5 rounded-lg transition-all" title="Ouvrir">
                                                    <ExternalLink className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <Toast
                isVisible={showWelcome}
                message="Bienvenue dans votre espace cours ! 3 nouveaux documents sont disponibles en Mathématiques."
                type="info"
                onClose={() => setShowWelcome(false)}
            />
        </div>
    );
}
