"use client";
import React, { useState } from 'react';
import { Upload, FileText, Check, AlertCircle, X, ChevronRight, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CSVImportModuleProps {
    onImport: (data: any[]) => void;
    onClose: () => void;
}

const mockCSVData = [
    { nom: 'Alice Martin', email: 'alice.m@edu.com', classe: '3ème A' },
    { nom: 'Bob Dupont', email: 'b.dupont@edu.com', classe: '4ème B' },
    { nom: 'Charlie Casiraghi', email: 'charlie.c@edu.com', classe: '5ème C' },
    { nom: 'David Beckham', email: 'd.beckham@edu.com', classe: 'Lycée Term' },
];

export const CSVImportModule = ({ onImport, onClose }: CSVImportModuleProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const f = e.target.files[0];
            setFile(f);
            // Simulate CSV parsing
            setTimeout(() => {
                setPreview(mockCSVData);
                setIsLoaded(true);
            }, 800);
        }
    };

    const handleConfirmImport = () => {
        onImport(preview);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-white w-full max-w-2xl rounded-edu-xl shadow-2xl overflow-hidden border border-edu-border"
            >
                <div className="p-6 border-b border-edu-border flex justify-between items-center bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-edu-primary">
                            <Upload className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-edu-text-main leading-tight">Importation par lot (CSV)</h3>
                            <p className="text-xs text-muted-text font-bold uppercase mt-0.5">Élèves et Enseignants</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                <div className="p-8">
                    {!isLoaded ? (
                        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:border-edu-primary/30 transition-colors cursor-pointer group bg-slate-50/30">
                            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <FileText className="w-8 h-8 text-slate-300 group-hover:text-edu-primary transition-colors" />
                            </div>
                            <h4 className="text-lg font-bold text-edu-text-main mb-1">Glissez votre fichier ici</h4>
                            <p className="text-sm text-muted-text max-w-xs mb-6">Supporte uniquement les fichiers .csv encodés en UTF-8.</p>

                            <label className="bg-[#9156FF] hover:bg-[#7b42ea] text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all cursor-pointer shadow-lg shadow-indigo-100">
                                Parcourir les fichiers
                                <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
                            </label>

                            <button className="flex items-center gap-2 text-xs font-bold text-edu-primary mt-8 hover:underline italic">
                                <Download className="w-3 h-3" /> Télécharger le template CSV
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-3">
                                <Check className="w-5 h-5 text-emerald-600" />
                                <div>
                                    <p className="text-sm font-bold text-emerald-900">{file?.name} chargé avec succès</p>
                                    <p className="text-xs text-emerald-700/80">{preview.length} entrées détectées.</p>
                                </div>
                            </div>

                            <div className="max-h-[250px] overflow-y-auto border border-slate-100 rounded-xl">
                                <table className="w-full text-left">
                                    <thead className="sticky top-0 bg-slate-50 border-b border-slate-100">
                                        <tr>
                                            <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400">Nom</th>
                                            <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400">Email</th>
                                            <th className="px-4 py-3 text-[10px] font-black uppercase text-slate-400">Classe</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {preview.map((row, idx) => (
                                            <tr key={idx} className="bg-white">
                                                <td className="px-4 py-3 text-sm font-bold text-edu-text-main">{row.nom}</td>
                                                <td className="px-4 py-3 text-sm text-slate-500 font-medium">{row.email}</td>
                                                <td className="px-4 py-3 text-xs font-black text-indigo-600 uppercase">{row.classe}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setIsLoaded(false)}
                                    className="flex-1 px-4 py-3 border border-edu-border rounded-lg font-bold text-sm hover:bg-slate-50 transition-all text-slate-600"
                                >
                                    Changer de fichier
                                </button>
                                <button
                                    onClick={handleConfirmImport}
                                    className="flex-1 px-4 py-3 bg-[#9156FF] text-white rounded-lg font-bold text-sm hover:bg-[#7b42ea] transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
                                >
                                    Valider l&apos;importation <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
