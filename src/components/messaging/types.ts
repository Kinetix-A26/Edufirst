export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  role: 'admin' | 'teacher' | 'parent' | 'student';
  lastSeen?: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage?: Message;
  unreadCount: number;
}
