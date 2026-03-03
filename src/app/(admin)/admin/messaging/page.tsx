import React from 'react';
import ChatContainer from '@/components/messaging/ChatContainer';
import { Conversation, Message } from '@/components/messaging/types';

// Mock datastore for demonstration
const mockConversations: Conversation[] = [
    {
        id: 'conv-1',
        participant: {
            id: 'prof-1',
            name: 'Mme. Dubois',
            role: 'teacher',
            isOnline: true,
            avatarUrl: 'https://i.pravatar.cc/150?u=prof-1'
        },
        unreadCount: 2,
    },
    {
        id: 'conv-2',
        participant: {
            id: 'parent-1',
            name: 'M. Martin (Père de Léo)',
            role: 'parent',
            isOnline: false,
            avatarUrl: 'https://i.pravatar.cc/150?u=parent-1'
        },
        unreadCount: 0,
    },
    {
        id: 'conv-3',
        participant: {
            id: 'student-1',
            name: 'Léo Martin',
            role: 'student',
            isOnline: true,
        },
        unreadCount: 1,
    }
];

const mockMessages: Message[] = [
    {
        id: 'msg-1',
        senderId: 'prof-1',
        receiverId: 'user-1',
        content: 'Bonjour, avez-vous pu vérifier le dossier de Léo ?',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        isRead: false,
    },
    {
        id: 'msg-2',
        senderId: 'user-1',
        receiverId: 'parent-1',
        content: 'Bonjour M. Martin, la réunion parents-profs est confirmée pour jeudi prochain.',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        isRead: true,
    },
    {
        id: 'msg-3',
        senderId: 'student-1',
        receiverId: 'user-1',
        content: 'Pouvez-vous valider mon absence de vendredi svp ?',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        isRead: false,
    }
];

// Initialize lastMessage from messages
mockConversations[0].lastMessage = mockMessages[0];
mockConversations[1].lastMessage = mockMessages[1];
mockConversations[2].lastMessage = mockMessages[2];

export default function AdminMessagingPage() {
    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-[#0B1120] p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">

                <div className="flex flex-col space-y-2">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Messagerie Interne
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Communiquez avec les professeurs, les parents et les élèves de manière sécurisée. H-to-H (Humain-à-Humain).
                    </p>
                </div>

                <ChatContainer
                    initialConversations={mockConversations}
                    initialMessages={mockMessages}
                />

            </div>
        </div>
    );
}
