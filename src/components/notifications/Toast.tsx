"use client";
import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'success' | 'info' | 'error';

interface ToastProps {
    message: string;
    type?: ToastType;
    isVisible: boolean;
    onClose: () => void;
}

export const Toast = ({ message, type = 'info', isVisible, onClose }: ToastProps) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-500" />,
        info: <Info className="w-5 h-5 text-blue-500" />,
        error: <AlertCircle className="w-5 h-5 text-red-500" />
    };

    const colors = {
        success: 'border-green-100 bg-green-50',
        info: 'border-blue-100 bg-blue-50',
        error: 'border-red-100 bg-red-50'
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`fixed bottom-8 right-8 z-50 p-4 rounded-edu-xl border shadow-lg flex items-center gap-3 min-w-[300px] ${colors[type]}`}
                >
                    {icons[type]}
                    <p className="text-sm font-medium text-slate-800 flex-1">{message}</p>
                    <button onClick={onClose} className="p-1 hover:bg-black/5 rounded-full transition-colors">
                        <X className="w-4 h-4 text-slate-400" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
