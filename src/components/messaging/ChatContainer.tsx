"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, MoreVertical, Phone, Video, Paperclip, Smile } from 'lucide-react';
import { Conversation, Message, User } from './types';

// Mock data for demonstration purposes
const CURRENT_USER_ID = "user-1";

interface ChatContainerProps {
    initialConversations?: Conversation[];
    initialMessages?: Message[];
}

export default function ChatContainer({ initialConversations = [], initialMessages = [] }: ChatContainerProps) {
    const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(
        initialConversations.length > 0 ? initialConversations[0].id : null
    );
    const [searchTerm, setSearchTerm] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, activeConversationId]);

    const activeConversation = conversations.find(c => c.id === activeConversationId);

    const filteredConversations = conversations.filter(c =>
        c.participant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const activeMessages = messages.filter(
        m => activeConversation && (
            (m.senderId === CURRENT_USER_ID && m.receiverId === activeConversation.participant.id) ||
            (m.senderId === activeConversation.participant.id && m.receiverId === CURRENT_USER_ID)
        )
    ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeConversation) return;

        const newMsg: Message = {
            id: `msg-${crypto.randomUUID()}`,
            senderId: CURRENT_USER_ID,
            receiverId: activeConversation.participant.id,
            content: newMessage.trim(),
            timestamp: new Date().toISOString(),
            isRead: false,
        };

        setMessages([...messages, newMsg]);
        setNewMessage('');

        // Update conversation last message
        setConversations(conversations.map(c =>
            c.id === activeConversation.id
                ? { ...c, lastMessage: newMsg }
                : c
        ));
    };

    return (
        <div className="flex bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800" style={{ height: 'calc(100vh - 12rem)', minHeight: '600px' }}>

            {/* LEFT COLUMN: Contacts */}
            <div className="w-full md:w-80 lg:w-96 flex flex-col border-r border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">

                {/* Header & Search */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 px-1">Messagerie</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Rechercher un contact..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#9156FF] focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Contact List */}
                <div className="flex-1 overflow-y-auto py-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {filteredConversations.length > 0 ? (
                        filteredConversations.map((conv) => (
                            <div
                                key={conv.id}
                                onClick={() => setActiveConversationId(conv.id)}
                                className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-xl cursor-pointer transition-all duration-200 ${activeConversationId === conv.id
                                    ? 'bg-gradient-to-r from-[#9156FF]/10 to-transparent'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <div className="relative flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-[#9156FF]/20 flex items-center justify-center text-[#9156FF] font-semibold text-lg border border-white dark:border-gray-800 shadow-sm">
                                        {conv.participant.avatarUrl ? (
                                            <img src={conv.participant.avatarUrl} alt={conv.participant.name} className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            conv.participant.name.charAt(0)
                                        )}
                                    </div>
                                    {conv.participant.isOnline && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className={`font-semibold text-sm truncate ${activeConversationId === conv.id ? 'text-[#9156FF]' : 'text-gray-900 dark:text-gray-100'}`}>
                                            {conv.participant.name}
                                        </h3>
                                        {conv.lastMessage && (
                                            <span className="text-xs text-gray-400 whitespace-nowrap">
                                                {new Date(conv.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className={`text-xs truncate pr-2 ${conv.unreadCount > 0 ? 'text-gray-800 dark:text-gray-200 font-medium' : 'text-gray-500'}`}>
                                            {conv.lastMessage ? conv.lastMessage.content : 'Nouvelle conversation'}
                                        </p>
                                        {conv.unreadCount > 0 && (
                                            <span className="flex-shrink-0 bg-[#9156FF] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                                {conv.unreadCount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-400 text-sm">
                            Aucun contact trouvé
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT COLUMN: Chat View */}
            <div className={`flex-1 flex flex-col ${activeConversationId ? 'flex' : 'hidden md:flex'} h-full bg-white dark:bg-gray-900`}>

                {activeConversation ? (
                    <>
                        {/* Chat Header */}
                        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 shadow-sm z-10">
                            <div className="flex items-center gap-4">
                                {/* Mobile back button */}
                                <button
                                    onClick={() => setActiveConversationId(null)}
                                    className="md:hidden p-2 -ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-[#9156FF]/20 flex items-center justify-center text-[#9156FF] font-semibold">
                                        {activeConversation.participant.avatarUrl ? (
                                            <img src={activeConversation.participant.avatarUrl} alt={activeConversation.participant.name} className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            activeConversation.participant.name.charAt(0)
                                        )}
                                    </div>
                                    {activeConversation.participant.isOnline && (
                                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-gray-100">{activeConversation.participant.name}</h3>
                                    <p className="text-xs text-[#9156FF] font-medium capitalize">
                                        {activeConversation.participant.role} {activeConversation.participant.isOnline ? ' • En ligne' : ''}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-gray-400">
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                                    <Phone className="w-5 h-5" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                                    <Video className="w-5 h-5" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50/30 dark:bg-[#0B1120]/30" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {activeMessages.map((msg, index) => {
                                const isMine = msg.senderId === CURRENT_USER_ID;
                                const showAvatar = !isMine && (index === 0 || activeMessages[index - 1].senderId !== msg.senderId);

                                return (
                                    <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'} group flex-col`}>
                                        <div className={`flex gap-2 max-w-[85%] md:max-w-[75%] ${isMine ? 'flex-row-reverse' : 'flex-row'} items-end`}>
                                            {/* Avatar placeholder for alignment if not mine */}
                                            {!isMine && (
                                                <div className="w-8 flex-shrink-0">
                                                    {showAvatar && (
                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-[#9156FF]/20 flex items-center justify-center text-[#9156FF] text-xs font-semibold">
                                                            {activeConversation.participant.name.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
                                                <div
                                                    className={`px-4 py-2.5 rounded-2xl shadow-sm text-[15px] leading-relaxed break-words whitespace-pre-wrap ${isMine
                                                        ? 'bg-gradient-to-br from-[#9156FF] to-[#7b42ea] text-white rounded-br-sm'
                                                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-sm border border-gray-100 dark:border-gray-700'
                                                        }`}
                                                >
                                                    {msg.content}
                                                </div>
                                            </div>
                                        </div>

                                        <span className={`text-[10px] text-gray-400 mt-1 px-1 transition-opacity ${isMine ? 'text-right mr-2' : 'ml-10'} opacity-0 group-hover:opacity-100`}>
                                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* strictly human-to-human Message Input */}
                        <div className="px-3 md:px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                            <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                                <div className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl flex items-center p-1 focus-within:ring-2 focus-within:ring-[#9156FF]/50 focus-within:border-[#9156FF] transition-all">
                                    <button type="button" className="hidden sm:block p-2 text-gray-400 hover:text-[#9156FF] transition-colors rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50">
                                        <Smile className="w-5 h-5" />
                                    </button>
                                    <button type="button" className="p-2 text-gray-400 hover:text-[#9156FF] transition-colors rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50">
                                        <Paperclip className="w-5 h-5" />
                                    </button>
                                    <textarea
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendMessage(e);
                                            }
                                        }}
                                        placeholder="Écrivez un message humain-à-humain..."
                                        className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-2.5 px-2 text-sm max-h-32 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
                                        rows={1}
                                        style={{ minHeight: '44px' }}
                                        autoComplete="off"
                                        autoCorrect="off"
                                        spellCheck="false"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!newMessage.trim()}
                                        className={`p-2.5 m-1 rounded-xl transition-all ${newMessage.trim()
                                            ? 'bg-[#9156FF] text-white shadow-md hover:bg-[#7b42ea] hover:scale-105 active:scale-95'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 h-full">
                        <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                            <span className="text-[#9156FF] font-light text-4xl">@</span>
                        </div>
                        <p className="text-lg font-medium text-gray-500 mb-1">Vos Messages</p>
                        <p className="text-sm">Sélectionnez un contact pour démarrer une conversation</p>
                    </div>
                )}
            </div>

        </div>
    );
}
