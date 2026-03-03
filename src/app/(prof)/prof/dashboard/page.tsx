"use client";

import React from 'react';
import { Users, Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import Link from 'next/link';

interface ClassData {
    id: string;
    name: string;
    room: string;
    studentCount: number;
    attendanceRate: number;
    nextSession?: string;
    status: 'active' | 'upcoming' | 'completed';
}

const mockClasses: ClassData[] = [
    {
        id: 'c1',
        name: '6ème Scientifique A',
        room: 'Salle 102',
        studentCount: 32,
        attendanceRate: 98,
        nextSession: '10:00 - 11:30',
        status: 'active'
    },
    {
        id: 'c2',
        name: '5ème Littéraire B',
        room: 'Salle 205',
        studentCount: 28,
        attendanceRate: 100,
        nextSession: '14:00 - 15:30',
        status: 'upcoming'
    },
    {
        id: 'c3',
        name: 'Terminale Maths C',
        room: 'Labo 1',
        studentCount: 25,
        attendanceRate: 92,
        status: 'completed'
    },
    {
        id: 'c4',
        name: '4ème Générale A',
        room: 'Salle 104',
        studentCount: 30,
        attendanceRate: 95,
        nextSession: '16:00 - 17:00',
        status: 'upcoming'
    }
];

export default function ProfDashboardPage() {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
            case 'upcoming': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
            case 'completed': return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active': return 'En cours';
            case 'upcoming': return 'À venir';
            case 'completed': return 'Terminé';
            default: return status;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-[#0B1120]">

            {/* Header - Utility focused, less decorative than Store */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Espace Professeur</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Gestion des salles et présences du jour</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Quick Actions */}
                <div className="mb-8 flex flex-wrap gap-4">
                    <Link
                        href="/prof/reports"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#9156FF] text-white rounded-lg font-medium hover:bg-[#7b42ea] hover:shadow-md transition-all active:scale-[0.98]"
                    >
                        <Clock className="w-4 h-4" />
                        Nouveau Rapport Journalier
                    </Link>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Users className="w-4 h-4" />
                        Appel Rapide
                    </button>
                </div>

                {/* Classes Grid - Focused on clarity and data */}
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mes Classes du Jour</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {mockClasses.map(cls => (
                        <div
                            key={cls.id}
                            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:border-[#9156FF]/50 transition-colors group flex flex-col"
                        >
                            {/* Card Header */}
                            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-[#9156FF] transition-colors">{cls.name}</h3>
                                    <p className="text-sm text-gray-500 flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                                        {cls.room}
                                    </p>
                                </div>
                                <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${getStatusColor(cls.status)}`}>
                                    {getStatusLabel(cls.status)}
                                </span>
                            </div>

                            {/* Card Body - Key Metrics */}
                            <div className="p-5 flex-1 grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">Effectifs</span>
                                    <div className="flex items-end gap-2">
                                        <span className="text-2xl font-bold text-gray-900 dark:text-white leading-none">{cls.studentCount}</span>
                                        <span className="text-sm text-gray-500 mb-0.5"><Users className="w-4 h-4" /></span>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">Présence</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold text-gray-900 dark:text-white leading-none">{cls.attendanceRate}%</span>
                                        {cls.attendanceRate < 95 ? (
                                            <AlertCircle className="w-4 h-4 text-amber-500" />
                                        ) : (
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer - Action oriented */}
                            <div className="px-5 py-4 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                    {cls.nextSession ? cls.nextSession : '--:--'}
                                </span>
                                <button className="text-sm font-semibold text-[#9156FF] hover:text-[#7b42ea] flex items-center gap-1 transition-colors">
                                    Gérer <span aria-hidden="true">&rarr;</span>
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
