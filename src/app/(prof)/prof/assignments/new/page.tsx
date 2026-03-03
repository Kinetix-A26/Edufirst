"use client";

import React, { useState, useRef } from 'react';
import {
    FilePlus,
    Send,
    Calendar,
    Users,
    FileText,
    X,
    Link as LinkIcon,
    Upload,
    CheckCircle2,
    AlertCircle,
    Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NewAssignmentPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [files, setFiles] = useState<{ name: string, size: string, progress: number, status: 'uploading' | 'done' }[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const classes = ["6ème A", "4ème B", "3ème C", "Terminale S"];

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            const newFiles = Array.from(selectedFiles).map(file => ({
                name: file.name,
                size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
                progress: 0,
                status: 'uploading' as const
            }));
            setFiles(prev => [...prev, ...newFiles]);

            // Simulate upload progress
            newFiles.forEach((file, index) => {
                let prog = 0;
                const interval = setInterval(() => {
                    prog += Math.random() * 30;
                    if (prog >= 100) {
                        prog = 100;
                        clearInterval(interval);
                        setFiles(current =>
                            current.map(f => f.name === file.name ? { ...f, progress: 100, status: 'done' } : f)
                        );
                    } else {
                        setFiles(current =>
                            current.map(f => f.name === file.name ? { ...f, progress: Math.floor(prog) } : f)
                        );
                    }
                }, 300);
            });
        }
    };

    const removeFile = (name: string) => {
        setFiles(files.filter(f => f.name !== name));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            alert("Devoir créé et envoyé aux élèves !");
            setTitle('');
            setDescription('');
            setDeadline('');
            setSelectedClass('');
            setFiles([]);
        }, 2000);
    };

    return (
        <div className="p-4 md:p-8 bg-edu-bg min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-primary/10 text-primary rounded-edu shadow-soft">
                        <FilePlus size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-edu-text-main">Créer un nouveau devoir</h1>
                        <p className="text-muted-text">Assignez des exercices et des ressources à vos classes.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-edu-xl border border-edu-border shadow-soft space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-edu-text-main mb-1.5">Titre du devoir</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="ex: Dissertation sur l'humanisme - Chapitre 2"
                                    className="input w-full bg-edu-soft border-none focus:ring-2 focus:ring-primary/20 h-12"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-edu-text-main mb-1.5">Instructions / Description</label>
                                <textarea
                                    required
                                    rows={6}
                                    placeholder="Détaillez ici les consignes, les objectifs et les supports à utiliser..."
                                    className="textarea w-full bg-edu-soft border-none focus:ring-2 focus:ring-primary/20 text-base"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="pt-2">
                                <label className="block text-sm font-semibold text-edu-text-main mb-3">Ressources jointes</label>

                                <div
                                    className="border-2 border-dashed border-edu-border rounded-edu-xl p-8 text-center hover:bg-edu-soft/50 transition-colors cursor-pointer group"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <input
                                        type="file"
                                        multiple
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleFileSelect}
                                    />
                                    <div className="bg-primary/5 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                        <Upload className="text-primary" size={24} />
                                    </div>
                                    <p className="text-sm font-bold text-edu-text-main">Cliquez pour joindre des fichiers</p>
                                    <p className="text-xs text-muted-text mt-1">PDF, Word, Images ou exercices (Max 10 Mo par fichier)</p>
                                </div>

                                <div className="mt-4 space-y-3">
                                    <AnimatePresence>
                                        {files.map((file, idx) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 10 }}
                                                key={idx}
                                                className="flex items-center gap-4 bg-edu-soft/50 p-3 rounded-edu border border-edu-border"
                                            >
                                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                                    <FileText size={20} className="text-primary" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-sm font-bold text-edu-text-main truncate">{file.name}</span>
                                                        <span className="text-[10px] font-bold text-muted-text">{file.size}</span>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-edu-border rounded-full overflow-hidden">
                                                        <motion.div
                                                            className="h-full bg-primary"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${file.progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(file.name)}
                                                    className="p-1 hover:bg-white rounded-full text-muted-text hover:text-red-500 transition-colors"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Settings */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-edu-xl border border-edu-border shadow-soft space-y-6">
                            <h3 className="font-bold text-edu-text-main flex items-center gap-2">
                                <Calendar size={18} className="text-primary" /> Paramètres d'envoi
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-muted-text uppercase tracking-widest mb-1.5">Classe Cible</label>
                                    <select
                                        required
                                        className="select w-full bg-edu-soft border-none focus:ring-2 focus:ring-primary/20"
                                        value={selectedClass}
                                        onChange={e => setSelectedClass(e.target.value)}
                                    >
                                        <option value="">Sélectionner une classe</option>
                                        {classes.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-muted-text uppercase tracking-widest mb-1.5">Date limite de remise</label>
                                    <div className="relative">
                                        <input
                                            type="datetime-local"
                                            required
                                            className="input w-full bg-edu-soft border-none focus:ring-2 focus:ring-primary/20 pl-10"
                                            value={deadline}
                                            onChange={e => setDeadline(e.target.value)}
                                        />
                                        <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label cursor-pointer justify-start gap-3">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-sm rounded" />
                                        <span className="label-text font-semibold text-edu-text-main">Autoriser les remises en retard</span>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4 space-y-3">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn w-full bg-primary hover:bg-primary/90 text-white border-none h-12 shadow-lg shadow-primary/20"
                                >
                                    {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : (
                                        <>
                                            <Send size={18} /> Publier le devoir
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-ghost w-full text-muted-text font-bold"
                                >
                                    Enregistrer comme brouillon
                                </button>
                            </div>
                        </div>

                        <div className="bg-amber-50 p-4 rounded-edu border border-amber-100 flex gap-3">
                            <AlertCircle className="text-amber-500 shrink-0" size={20} />
                            <p className="text-xs text-amber-800 leading-relaxed font-medium">
                                <strong>Important :</strong> Une fois le devoir publié, une notification sera envoyée à tous les élèves de la classe sélectionnée.
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
