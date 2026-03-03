"use client";

import React from 'react';
import ChatContainer from '@/components/messaging/ChatContainer';
import { Conversation, Message } from '@/components/messaging/types';

// Mock data: Peer-to-Peer and Teacher interactions only (No Admin/Parent)
const mockConversations: Conversation[] = [
    {
        id: 'conv-prof',
        participant: {
            id: 'prof-maths',
            name: 'M. Dubois (Maths)',
            role: 'teacher',
            isOnline: true,
            avatarUrl: 'https://i.pravatar.cc/150?u=prof-maths'
        },
        unreadCount: 1,
    },
    {
        id: 'conv-peer1',
        participant: {
            id: 'student-2',
            name: 'Sarah Benali',
            role: 'student',
            isOnline: true,
            avatarUrl: 'https://i.pravatar.cc/150?u=sarah'
        },
        unreadCount: 0,
    },
    {
        id: 'conv-peer2',
        participant: {
            id: 'student-3',
            name: 'Thomas Leroy',
            role: 'student',
            isOnline: false,
        },
        unreadCount: 3,
    }
];

const mockMessages: Message[] = [
    {
        id: 'm1',
        senderId: 'prof-maths',
        receiverId: 'user-1',
        content: 'Bonjour Léo, as-tu bien compris l\'exercice 4 pour demain ?',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
        isRead: false,
    },
    {
        id: 'm2',
        senderId: 'user-1',
        receiverId: 'student-2',
        content: 'Tu as réussi l\'intro de Français ? C\'est galère...',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        isRead: true,
    },
    {
        id: 'm3',
        senderId: 'student-3',
        receiverId: 'user-1',
        content: 'On se rejoint au CDI à 13h ?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        isRead: false,
    }
];

// Map last messages
mockConversations[0].lastMessage = mockMessages[0];
mockConversations[1].lastMessage = mockMessages[1];
mockConversations[2].lastMessage = mockMessages[2];

export default function StudentMessagingPage() {
    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-[#0B1120] p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Dynamic / Youthful Header */}
                <div className="flex flex-col space-y-2 pb-2">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#9156FF]/10 rounded-xl flex items-center justify-center text-[#9156FF]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg>
                        </div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Discussion
                        </h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-sm pl-13">
                        Discute avec tes professeurs et tes camarades de classe.
                    </p>
                </div>

                {/* Integration of the shared completely human-to-human ChatContainer */}
                <ChatContainer
                    initialConversations={mockConversations}
                    initialMessages={mockMessages}
                />

            </div>
        </div>
    );
}
