"use client";
import React, { useState, useEffect } from 'react';
import { Bell, X, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export type Notification = {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning';
    time: string;
    isRead: boolean;
};

export const NotificationCenter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            title: 'Nouveau Cours',
            message: 'M. Dubois a publié un nouveau chapitre en Mathématiques.',
            type: 'info',
            time: 'Il y a 5 min',
            isRead: false,
        },
        {
            id: '2',
            title: 'Devoir Urgent',
            message: 'Le rendu du projet Histoire est pour demain.',
            type: 'warning',
            time: 'Il y a 1h',
            isRead: false,
        }
    ]);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-muted-text hover:bg-edu-bg rounded-md transition-colors"
            >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-edu-xl shadow-lg border border-edu-border z-20 overflow-hidden">
                        <div className="p-4 border-b border-edu-border flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-edu-text-main">Notifications</h3>
                            <button onClick={() => setIsOpen(false)}><X className="w-4 h-4 text-muted-text" /></button>
                        </div>
                        <div className="max-h-[350px] overflow-y-auto">
                            {notifications.length > 0 ? (
                                notifications.map((n) => (
                                    <div key={n.id} className={`p-4 border-b border-edu-border hover:bg-slate-50 cursor-pointer transition-colors ${!n.isRead ? 'bg-indigo-50/30' : ''}`}>
                                        <div className="flex gap-3">
                                            <div className="mt-1">
                                                {n.type === 'info' && <Info className="w-4 h-4 text-blue-500" />}
                                                {n.type === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                                                {n.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-edu-text-main">{n.title}</p>
                                                <p className="text-xs text-muted-text mt-0.5 leading-relaxed">{n.message}</p>
                                                <p className="text-[10px] text-slate-400 mt-2">{n.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-muted-text">
                                    <p className="text-sm">Aucune notification</p>
                                </div>
                            )}
                        </div>
                        <div className="p-3 text-center border-t border-edu-border">
                            <button className="text-xs font-bold text-edu-primary hover:underline">Tout marquer comme lu</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
