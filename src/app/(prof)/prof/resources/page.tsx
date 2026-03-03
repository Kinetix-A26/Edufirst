"use client";

import React, { useState } from 'react';
import {
    Folder,
    File,
    Search,
    MoreVertical,
    FolderPlus,
    Upload,
    Eye,
    Clock,
    ChevronRight,
    FolderOpen,
    PieChart,
    Filter,
    BarChart2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data for Folders and Files
const INITIAL_FOLDERS = [
    { id: 1, name: "Chapitre 1 : L'Antiquité", filesCount: 12, size: "45 MB", lastModified: "Il y a 2 jours", views: 156 },
    { id: 2, name: "Chapitre 2 : Le Moyen Âge", filesCount: 8, size: "32 MB", lastModified: "Hier", views: 89 },
    { id: 3, name: "Chapitre 3 : La Renaissance", filesCount: 15, size: "58 MB", lastModified: "Aujourd'hui", views: 42 },
    { id: 4, name: "Examens & Devoirs", filesCount: 5, size: "12 MB", lastModified: "Il y a 1 semaine", views: 210 },
];

const RECENT_RESOURCES = [
    { id: 101, name: "Plan de cours - Renaissance.pdf", type: "pdf", views: 45, date: "03/03/2026", size: "1.2 MB" },
    { id: 102, name: "Exercices corrigés - Humanisme.docx", type: "doc", views: 32, date: "02/03/2026", size: "450 KB" },
    { id: 103, name: "Audio : Lecture de poèmes.mp3", type: "audio", views: 18, date: "02/03/2026", size: "5.4 MB" },
];

export default function ResourcePage() {
    const [folders, setFolders] = useState(INITIAL_FOLDERS);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const filteredFolders = folders.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="p-4 md:p-8 bg-edu-bg min-h-screen">
            {/* Header & Stats Overview */}
            <div className="flex flex-col xl:flex-row gap-6 mb-8">
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-edu-text-main">Gestionnaire de Ressources</h1>
                    <p className="text-muted-text mt-1">Organisez vos supports pédagogiques et suivez l'engagement des élèves.</p>

                    <div className="flex flex-wrap gap-4 mt-6">
                        <button className="btn bg-primary hover:bg-primary/90 text-white gap-2 border-none px-6 shadow-lg shadow-primary/20">
                            <FolderPlus size={18} /> Nouveau Dossier
                        </button>
                        <button className="btn bg-white border-edu-border hover:bg-edu-soft text-edu-text-main gap-2">
                            <Upload size={18} /> Téléverser
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 xl:w-[500px]">
                    {[
                        { label: "Vues Totales", value: "2.4k", icon: Eye, color: "text-blue-500", bg: "bg-blue-50" },
                        { label: "Téléchargements", value: "856", icon: BarChart2, color: "text-primary", bg: "bg-primary/5" },
                        { label: "Espace utilisé", value: "1.2 GB", icon: PieChart, color: "text-amber-500", bg: "bg-amber-50" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-4 rounded-edu border border-edu-border shadow-soft">
                            <div className={`w-10 h-10 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center mb-3`}>
                                <stat.icon size={20} />
                            </div>
                            <p className="text-xs font-bold text-muted-text uppercase tracking-wider">{stat.label}</p>
                            <p className="text-xl font-black text-edu-text-main">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-edu-xl border border-edu-border shadow-soft mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" size={18} />
                    <input
                        type="text"
                        placeholder="Rechercher un cours, un fichier ou un chapitre..."
                        className="input w-full bg-edu-soft border-none focus:ring-2 focus:ring-primary/20 pl-10"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex bg-edu-soft p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-muted-text'}`}
                        >
                            <BarChart2 className="rotate-90" size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-muted-text'}`}
                        >
                            <Filter className="rotate-90" size={18} />
                        </button>
                    </div>
                    <div className="h-6 w-[1px] bg-edu-border"></div>
                    <button className="btn btn-ghost btn-sm text-muted-text font-bold gap-2">
                        Plus récents <ChevronRight size={14} className="rotate-90" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Main Library View */}
                <div className="xl:col-span-3">
                    <h2 className="text-lg font-bold text-edu-text-main mb-4 flex items-center gap-2">
                        <FolderOpen className="text-primary" size={20} /> Bibliothèques des Dossiers
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {filteredFolders.map((folder) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    key={folder.id}
                                    className="bg-white p-5 rounded-edu-xl border border-edu-border shadow-soft hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-amber-50 text-amber-500 rounded-xl group-hover:bg-amber-100 transition-colors">
                                            <Folder size={28} fill="currentColor" fillOpacity={0.2} />
                                        </div>
                                        <button className="text-muted-text hover:text-edu-text-main">
                                            <MoreVertical size={20} />
                                        </button>
                                    </div>

                                    <h3 className="font-bold text-edu-text-main mb-1 truncate">{folder.name}</h3>
                                    <div className="flex items-center gap-3 text-xs text-muted-text mb-4">
                                        <span className="flex items-center gap-1"><File size={12} /> {folder.filesCount} fichiers</span>
                                        <span>•</span>
                                        <span>{folder.size}</span>
                                    </div>

                                    <div className="pt-4 border-t border-edu-soft flex justify-between items-center">
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-text uppercase">
                                            <Eye size={12} className="text-primary" /> {folder.views} vues
                                        </div>
                                        <span className="text-[10px] text-muted-text italic">{folder.lastModified}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Sidebar: Recent & Consulted */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-lg font-bold text-edu-text-main mb-4 flex items-center gap-2">
                            <Clock className="text-primary" size={20} /> Récents
                        </h2>
                        <div className="bg-white rounded-edu-xl border border-edu-border shadow-soft divide-y divide-edu-soft">
                            {RECENT_RESOURCES.map((doc) => (
                                <div key={doc.id} className="p-4 hover:bg-edu-soft/30 transition-colors cursor-pointer group">
                                    <div className="flex gap-3 items-start">
                                        <div className="p-2 bg-blue-50 text-blue-500 rounded-lg group-hover:bg-blue-100 transition-colors">
                                            <File size={18} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-edu-text-main truncate">{doc.name}</p>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-[10px] text-muted-text font-medium">{doc.size}</span>
                                                <div className="flex items-center gap-1 text-[10px] font-bold text-primary">
                                                    <Eye size={10} /> {doc.views}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-primary p-6 rounded-edu-xl shadow-xl shadow-primary/20 text-white relative overflow-hidden">
                        <div className="z-10 relative">
                            <h3 className="text-lg font-bold mb-2">Besoin d'aide ?</h3>
                            <p className="text-sm opacity-90 mb-6 leading-relaxed">
                                Le saviez-vous ? Les ressources partagées au format vidéo ont un taux de consultation 40% plus élevé.
                            </p>
                            <button className="btn btn-sm bg-white text-primary border-none hover:bg-edu-soft px-4">
                                Consulter mes stats
                            </button>
                        </div>
                        <BarChart2 className="absolute -right-4 -bottom-4 opacity-10 rotate-12" size={120} />
                    </div>
                </div>
            </div>
        </div>
    );
}
