"use client";

import React, { useState, useEffect } from 'react';
import {
    Save,
    Send,
    Calculator,
    TrendingUp,
    Users,
    GraduationCap,
    ChevronDown,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Student Data
const INITIAL_STUDENTS = [
    { id: 1, name: "Lucas Bernard", avatar: "LB", grade: "" },
    { id: 2, name: "Emma Petit", avatar: "EP", grade: "" },
    { id: 3, name: "Thomas Roux", avatar: "TR", grade: "" },
    { id: 4, name: "Chloé Fontaine", avatar: "CF", grade: "" },
    { id: 5, name: "Léo Girard", avatar: "LG", grade: "" },
    { id: 6, name: "Camille Morel", avatar: "CM", grade: "" },
    { id: 7, name: "Enzo Faure", avatar: "EF", grade: "" },
    { id: 8, name: "Manon Blanc", avatar: "MB", grade: "" },
];

export default function GradesPage() {
    const [students, setStudents] = useState(INITIAL_STUDENTS);
    const [selectedClass, setSelectedClass] = useState("6ème A");
    const [selectedExam, setSelectedExam] = useState("Devoir n°1 - Trimestre 2");
    const [average, setAverage] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Calculate average in real-time
    useEffect(() => {
        const grades = students
            .map(s => parseFloat(s.grade))
            .filter(g => !isNaN(g));

        if (grades.length > 0) {
            const sum = grades.reduce((a, b) => a + b, 0);
            setAverage(Number((sum / grades.length).toFixed(2)));
        } else {
            setAverage(null);
        }
    }, [students]);

    const handleGradeChange = (id: number, value: string) => {
        // Only allow numbers between 0 and 20 (standard French system)
        if (value === "" || (parseFloat(value) >= 0 && parseFloat(value) <= 20)) {
            setStudents(students.map(s => s.id === id ? { ...s, grade: value } : s));
        }
    };

    const handleSaveDraft = () => {
        alert("Brouillon enregistré avec succès !");
    };

    const handleSubmit = () => {
        if (students.some(s => s.grade === "")) {
            if (!confirm("Certaines notes sont manquantes. Voulez-vous vraiment soumettre ?")) return;
        }
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <div className="p-4 md:p-8 bg-edu-bg min-h-screen">
            {/* Header & Selectors */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-edu-text-main">Saisie des Notes</h1>
                    <p className="text-muted-text mt-1">Transformez vos observations en données chiffrées.</p>

                    <div className="flex flex-wrap gap-4 mt-6">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-muted-text uppercase tracking-wider">Classe</label>
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn bg-white border-edu-border hover:bg-edu-soft text-edu-text-main gap-4 justify-between w-40 h-10 min-h-0">
                                    {selectedClass} <ChevronDown size={14} />
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-soft bg-white rounded-box w-40 mt-1 border border-edu-border">
                                    <li><a onClick={() => setSelectedClass("6ème A")}>6ème A</a></li>
                                    <li><a onClick={() => setSelectedClass("4ème B")}>4ème B</a></li>
                                    <li><a onClick={() => setSelectedClass("3ème C")}>3ème C</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-muted-text uppercase tracking-wider">Évaluation</label>
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn bg-white border-edu-border hover:bg-edu-soft text-edu-text-main gap-4 justify-between w-64 h-10 min-h-0">
                                    {selectedExam} <ChevronDown size={14} />
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-soft bg-white rounded-box w-64 mt-1 border border-edu-border">
                                    <li><a onClick={() => setSelectedExam("Devoir n°1 - Trimestre 2")}>Devoir n°1 - Trimestre 2</a></li>
                                    <li><a onClick={() => setSelectedExam("Composition - Mars")}>Composition - Mars</a></li>
                                    <li><a onClick={() => setSelectedExam("Interrogation Flash")}>Interrogation Flash</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-edu border border-primary/10 flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-full bg-primary text-white">
                            <Calculator size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-muted-text font-medium">Moyenne Classe</p>
                            <p className="text-2xl font-black text-primary">
                                {average !== null ? `${average}/20` : "--/20"}
                            </p>
                        </div>
                    </div>
                    <div className="h-10 w-[1px] bg-primary/10 hidden sm:block"></div>
                    <div className="hidden sm:flex items-center gap-2 text-green-600 font-semibold text-sm">
                        <TrendingUp size={16} /> +0.5 vs dern. devoir
                    </div>
                </div>
            </div>

            {/* Main Grid Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-4">
                    <div className="bg-white rounded-edu-xl border border-edu-border shadow-soft overflow-hidden">
                        <div className="p-4 border-b border-edu-border bg-edu-soft/30 flex justify-between items-center">
                            <h3 className="font-bold text-edu-text-main flex items-center gap-2">
                                <Users size={18} className="text-primary" /> Liste des élèves ({students.length})
                            </h3>
                            <div className="badge badge-primary badge-outline font-semibold">Matière: Mathématiques</div>
                        </div>

                        <table className="table w-full">
                            <thead>
                                <tr className="text-muted-text border-b border-edu-border">
                                    <th className="bg-transparent font-semibold">Élève</th>
                                    <th className="bg-transparent font-semibold text-center w-32">Note /20</th>
                                    <th className="bg-transparent font-semibold hidden md:table-cell">Observations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-edu-border">
                                {students.map((student) => (
                                    <tr key={student.id} className="hover:bg-edu-soft/20 transition-colors">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="avatar placeholder">
                                                    <div className="bg-edu-soft text-edu-text-main rounded-lg w-8 h-8">
                                                        <span className="text-xs font-bold">{student.avatar}</span>
                                                    </div>
                                                </div>
                                                <span className="font-semibold text-edu-text-main">{student.name}</span>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <input
                                                type="number"
                                                step="0.25"
                                                min="0"
                                                max="20"
                                                placeholder="--"
                                                className="input input-bordered w-20 text-center font-bold text-primary focus:border-primary border-edu-border bg-edu-bg h-10 min-h-0"
                                                value={student.grade}
                                                onChange={(e) => handleGradeChange(student.id, e.target.value)}
                                            />
                                        </td>
                                        <td className="hidden md:table-cell">
                                            <input
                                                type="text"
                                                placeholder="Ex: Très bon travail, persévérez..."
                                                className="input input-ghost w-full italic text-sm text-muted-text focus:bg-white"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sidebar Actions */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-edu-xl border border-edu-border shadow-soft">
                        <h3 className="text-lg font-bold text-edu-text-main mb-4 flex items-center gap-2">
                            <GraduationCap size={20} className="text-primary" /> Actions de session
                        </h3>

                        <div className="space-y-3">
                            <button
                                onClick={handleSaveDraft}
                                className="btn btn-outline w-full border-edu-border hover:bg-edu-soft text-edu-text-main gap-2 h-12"
                            >
                                <Save size={18} /> Sauvegarder en brouillon
                            </button>

                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitted}
                                className={`btn w-full gap-2 h-12 border-none ${isSubmitted ? 'bg-green-500 text-white' : 'bg-primary hover:bg-primary/90 text-white'}`}
                            >
                                {isSubmitted ? (
                                    <>
                                        <CheckCircle2 size={18} /> Transmis avec succès
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} /> Soumettre pour validation
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="mt-6 p-4 rounded-lg bg-amber-50 border border-amber-100 flex gap-3">
                            <AlertCircle className="text-amber-500 shrink-0" size={18} />
                            <p className="text-xs text-amber-800 leading-relaxed">
                                <strong>Attention:</strong> Une fois soumis, les notes ne peuvent plus être modifiées sans l'autorisation du préfet des études.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-edu-xl border border-edu-border shadow-soft">
                        <h4 className="font-bold text-edu-text-main mb-3">Aide à la saisie</h4>
                        <ul className="text-xs text-muted-text space-y-2">
                            <li className="flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-primary mt-1.5 font-bold"></div>
                                Utilisez la touche TAB pour passer à l'élève suivant.
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-primary mt-1.5 font-bold"></div>
                                Les notes sont sur 20 par défaut.
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-primary mt-1.5 font-bold"></div>
                                La moyenne s'actualise après chaque saisie.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
