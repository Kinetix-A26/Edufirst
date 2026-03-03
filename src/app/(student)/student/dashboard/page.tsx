"use client";

import React from 'react';
import { BookOpen, Clock, Calendar, Trophy, Zap, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Mock Data
const todaySchedule = [
    { id: 1, time: '08:00', subject: 'Mathématiques', room: 'Salle 102', type: 'cours', duration: '2h' },
    { id: 2, time: '10:15', subject: 'Physique-Chimie', room: 'Labo 1', type: 'tp', duration: '1h30' },
    { id: 3, time: '12:00', subject: 'Pause Déjeuner', room: 'Réfectoire', type: 'pause', duration: '1h30' },
    { id: 4, time: '13:30', subject: 'Français', room: 'Salle 205', type: 'cours', duration: '2h' },
    { id: 5, time: '15:45', subject: 'Anglais', room: 'Salle 104', type: 'cours', duration: '1h' },
];

const gradePercentage = 82; // Moyenne générale mock
const circumference = 2 * Math.PI * 45; // r=45
const strokeDashoffset = circumference - (gradePercentage / 100) * circumference;

export default function StudentDashboardPage() {
    const currentHour = 10; // Mock current time for timeline indicator

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-[#0B1120] font-sans">

            {/* Header - Dynamic & Young */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 sticky top-0 z-30">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-[#9156FF]/20 rounded-full flex items-center justify-center text-[#9156FF] font-bold text-xl border-2 border-white dark:border-gray-800 shadow-sm relative">
                            <img src="https://i.pravatar.cc/150?u=student-1" alt="Profile" className="w-full h-full rounded-full object-cover" />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                                Salut, Léo ! 👋
                            </h1>
                            <p className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
                                <Target className="w-3.5 h-3.5 text-[#9156FF]" /> 3ème Scientifique A
                            </p>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2" style={{ borderRadius: '14px' }}>
                        <Calendar className="w-4 h-4 text-[#9156FF]" />
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' })}
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT COLUMN: Main Progression & Quick Links */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* Widget: Ma Progression */}
                        <div
                            className="bg-white dark:bg-gray-900 p-6 shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden group"
                            style={{ borderRadius: '14px' }}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#9156FF]/5 to-transparent rounded-bl-full -z-0"></div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <Trophy className="w-5 h-5 text-[#9156FF]" /> Ma Progression
                                    </h2>
                                    <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-md">
                                        +2 pts
                                    </span>
                                </div>

                                <div className="flex flex-col items-center justify-center py-4">
                                    <div className="relative w-40 h-40 flex items-center justify-center">
                                        {/* SVG Progress Circle */}
                                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                            {/* Background Track */}
                                            <circle
                                                cx="50" cy="50" r="45"
                                                fill="transparent"
                                                stroke="currentColor"
                                                strokeWidth="8"
                                                className="text-gray-100 dark:text-gray-800"
                                            />
                                            {/* Progress Stream */}
                                            <circle
                                                cx="50" cy="50" r="45"
                                                fill="transparent"
                                                stroke="#9156FF"
                                                strokeWidth="8"
                                                strokeLinecap="round"
                                                strokeDasharray={circumference}
                                                strokeDashoffset={strokeDashoffset}
                                                className="transition-all duration-1000 ease-out"
                                            />
                                        </svg>

                                        {/* Inner Text */}
                                        <div className="absolute flex flex-col items-center justify-center">
                                            <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                                                16.4
                                            </span>
                                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-1">
                                                / 20
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
                                    <p className="text-sm text-gray-500 font-medium">Objectif Trimestre : 17.0</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions / Navigation */}
                        <div className="grid grid-cols-2 gap-4">
                            <Link
                                href="/student/courses"
                                className="bg-white dark:bg-gray-900 p-4 border border-gray-100 dark:border-gray-800 shadow-sm hover:border-[#9156FF]/50 hover:shadow-md transition-all group"
                                style={{ borderRadius: '14px' }}
                            >
                                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm">Mes Cours</h3>
                                <p className="text-xs text-gray-500 mt-1">2 nouveaux docs</p>
                            </Link>

                            <Link
                                href="/student/messaging"
                                className="bg-[#9156FF] p-4 text-white shadow-md shadow-[#9156FF]/20 hover:bg-[#7b42ea] hover:shadow-lg transition-all active:scale-95 flex flex-col justify-between group"
                                style={{ borderRadius: '14px' }}
                            >
                                <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform relative">
                                    <Zap className="w-5 h-5" />
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-[#9156FF] rounded-full"></span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">Discuter</h3>
                                    <p className="text-xs text-white/80 mt-1">1 msg Prof</p>
                                </div>
                            </Link>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Timeline (Emploi du temps) */}
                    <div className="lg:col-span-8">
                        <div
                            className="bg-white dark:bg-gray-900 p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800 h-full"
                            style={{ borderRadius: '14px' }}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Clock className="w-6 h-6 text-[#9156FF]" />
                                    Emploi du temps
                                </h2>
                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-300 rounded-full">
                                    Aujourd&apos;hui
                                </span>
                            </div>

                            {/* CLEAN VERTICAL TIMELINE */}
                            <div className="relative pl-4 md:pl-0">

                                {/* Timeline Line */}
                                <div className="absolute left-[39px] md:left-[108px] top-4 bottom-4 w-px bg-gray-200 dark:bg-gray-800"></div>

                                <div className="space-y-8">
                                    {todaySchedule.map((slot) => {
                                        const slotHour = parseInt(slot.time.split(':')[0], 10);
                                        const isPast = slotHour < currentHour;
                                        const isCurrent = slotHour === currentHour || (slotHour === 10 && currentHour === 10); // Mock logic
                                        const isBreak = slot.type === 'pause';

                                        return (
                                            <div key={slot.id} className="relative flex items-start gap-6 group">

                                                {/* Time Column */}
                                                <div className="hidden md:block w-20 text-right pt-1.5 flex-shrink-0">
                                                    <span className={`text-sm font-bold ${isCurrent ? 'text-[#9156FF]' : isPast ? 'text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                                        {slot.time}
                                                    </span>
                                                </div>

                                                {/* Node */}
                                                <div className="relative z-10 flex-shrink-0 pt-2">
                                                    <div className={`w-4 h-4 rounded-full border-4 ${isCurrent
                                                        ? 'bg-white dark:bg-gray-900 border-[#9156FF] ring-4 ring-[#9156FF]/20'
                                                        : isPast
                                                            ? 'bg-gray-200 dark:bg-gray-700 border-white dark:border-gray-900'
                                                            : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                                                        }`}></div>
                                                </div>

                                                {/* Content Card */}
                                                <div
                                                    className={`flex-1 p-4 border transition-all ${isCurrent
                                                        ? 'bg-[#9156FF]/5 border-[#9156FF]/30 shadow-sm'
                                                        : isBreak
                                                            ? 'bg-gray-50/50 dark:bg-gray-800/20 border-transparent border-dashed border-gray-200 dark:border-gray-800'
                                                            : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                                                        } ${isPast ? 'opacity-60 grayscale-[0.5]' : ''}`}
                                                    style={{ borderRadius: '14px' }}
                                                >
                                                    <div className="md:hidden mb-2">
                                                        <span className={`text-xs font-bold ${isCurrent ? 'text-[#9156FF]' : 'text-gray-500'}`}>
                                                            {slot.time} • {slot.duration}
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className={`font-bold text-lg ${isBreak ? 'text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                                                                {slot.subject}
                                                            </h3>
                                                            <p className="text-sm font-medium text-gray-500 mt-1 flex items-center gap-1.5">
                                                                {!isBreak && <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>}
                                                                {slot.room}
                                                            </p>
                                                        </div>

                                                        {!isBreak && !isPast && (
                                                            <button className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:bg-[#9156FF] group-hover:text-white transition-colors">
                                                                <ArrowRight className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>

                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
