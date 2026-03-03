"use client";
import React from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    MessageSquare,
    Settings,
    LogOut,
    GraduationCap
} from 'lucide-react';
import { usePathname } from 'next/navigation';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { name: 'Étudiants', icon: Users, href: '/admin/students' },
    { name: 'Cours', icon: BookOpen, href: '/prof/courses' }, // Link to Prof courses
    { name: 'Espace Élève', icon: GraduationCap, href: '/student/courses' }, // Link to Student courses
    { name: 'Messages', icon: MessageSquare, href: '/admin/messaging' },
    { name: 'Paramètres', icon: Settings, href: '/admin/settings' },
];

export const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="w-[260px] h-screen bg-white border-r border-edu-border p-6 flex flex-col sticky top-0">
            <div className="mb-10 px-2">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-edu-primary rounded-lg flex items-center justify-center text-white font-bold">E</div>
                    <span className="text-2xl font-black text-edu-text-main tracking-tight">EduFirst</span>
                </div>
            </div>

            <nav className="flex-1 space-y-1.5">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-edu-xl transition-all group ${isActive
                                    ? 'bg-edu-primary/10 text-edu-primary'
                                    : 'text-muted-text hover:bg-slate-50 hover:text-edu-text-main'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? 'text-edu-primary' : 'group-hover:text-edu-primary'} transition-colors`} />
                            <span className="font-bold text-sm tracking-wide">{item.name}</span>
                            {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-edu-primary"></div>}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-6 border-t border-edu-border">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-edu-xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm">
                    <LogOut className="w-5 h-5" />
                    Déconnexion
                </button>
            </div>
        </div>
    );
};
