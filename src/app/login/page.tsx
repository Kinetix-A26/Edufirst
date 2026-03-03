"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, GraduationCap, Users, ShieldCheck, ArrowRight, Lock, Mail } from 'lucide-react';

type Role = 'admin' | 'prof' | 'parent' | 'student';

interface RoleOption {
    id: Role;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

const roles: RoleOption[] = [
    {
        id: 'admin',
        title: 'Administrateur',
        description: 'Gestion de l\'établissement',
        icon: <ShieldCheck className="w-8 h-8" />,
        color: 'bg-blue-500'
    },
    {
        id: 'prof',
        title: 'Professeur',
        description: 'Suivi des classes et rapports',
        icon: <GraduationCap className="w-8 h-8" />,
        color: 'bg-amber-500'
    },
    {
        id: 'student',
        title: 'Étudiant',
        description: 'Cours et progression',
        icon: <User className="w-8 h-8" />,
        color: 'bg-[#9156FF]'
    },
    {
        id: 'parent',
        title: 'Parent',
        description: 'EduStore et suivi enfant',
        icon: <Users className="w-8 h-8" />,
        color: 'bg-emerald-500'
    }
];

export default function LoginPage() {
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRole) return;

        setIsLoading(true);

        // Simulating logic based on role
        setTimeout(() => {
            switch (selectedRole) {
                case 'admin':
                    router.push('/admin/dashboard');
                    break;
                case 'prof':
                    router.push('/prof/dashboard');
                    break;
                case 'parent':
                    router.push('/parent/store');
                    break;
                case 'student':
                    router.push('/student/dashboard');
                    break;
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0B1120] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-[#9156FF] rounded-2xl flex items-center justify-center text-white shadow-lg rotate-3 overflow-hidden">
                        <span className="text-3xl font-black">E</span>
                    </div>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    Edu First
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    S&apos;identifier pour accéder à votre espace
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
                <div className="bg-white dark:bg-gray-900 py-8 px-4 shadow-xl border border-gray-100 dark:border-gray-800 sm:px-10" style={{ borderRadius: '14px' }}>

                    <div className="mb-8">
                        <h3 className="text-center text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-6">
                            Choisissez votre profil
                        </h3>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {roles.map((role) => (
                                <button
                                    key={role.id}
                                    onClick={() => setSelectedRole(role.id)}
                                    className={`relative p-6 flex flex-col items-center text-center transition-all duration-300 group ${selectedRole === role.id
                                            ? 'bg-[#E9DDFF] border-2 border-[#9156FF] ring-2 ring-[#9156FF]/20 shadow-md'
                                            : 'bg-white dark:bg-gray-800 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                                        }`}
                                    style={{ borderRadius: '14px' }}
                                >
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4 transition-transform group-hover:scale-110 ${role.color} shadow-sm`}>
                                        {role.icon}
                                    </div>
                                    <h4 className={`font-bold text-sm ${selectedRole === role.id ? 'text-[#9156FF]' : 'text-gray-900 dark:text-white'}`}>
                                        {role.title}
                                    </h4>
                                    <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400 font-medium leading-tight">
                                        {role.description}
                                    </p>

                                    {selectedRole === role.id && (
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#9156FF] text-white rounded-full flex items-center justify-center shadow-md animate-bounce">
                                            <CheckIcon className="w-3.5 h-3.5" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={`transition-all duration-500 overflow-hidden ${selectedRole ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                        <div className="border-t border-gray-100 dark:border-gray-800 pt-8 mt-4">
                            <form className="space-y-6 max-w-md mx-auto" onSubmit={handleLogin}>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
                                        Adresse Email
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="block w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#9156FF] focus:border-transparent transition-all outline-none"
                                            style={{ borderRadius: '12px' }}
                                            placeholder="nom@ecole.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
                                        Mot de passe
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <Lock className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#9156FF] focus:border-transparent transition-all outline-none"
                                            style={{ borderRadius: '12px' }}
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`w-full flex justify-center items-center py-4 px-4 border border-transparent text-sm font-bold text-white shadow-lg shadow-[#9156FF]/20 hover:shadow-[#9156FF]/40 transition-all active:scale-[0.98] ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#9156FF] hover:bg-[#7b42ea]'
                                            }`}
                                        style={{ borderRadius: '12px' }}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Connexion en cours...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                Se connecter
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {!selectedRole && (
                        <div className="text-center mt-6">
                            <p className="text-xs text-gray-400 font-medium">
                                Sélectionnez un profil pour déverrouiller le formulaire
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <p className="mt-8 text-center text-xs text-gray-500 dark:text-gray-500">
                &copy; 2026 Edu First. Tous droits réservés. Design Purple Academic.
            </p>
        </div>
    );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    );
}
