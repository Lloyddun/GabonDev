import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Send, Search, MoreVertical } from 'lucide-react';

const Messages: React.FC = () => {
  const { conversations, messages, sendMessage, currentUser } = useApp();
  const [selectedConversationId, setSelectedConversationId] = useState<string>(conversations[0]?.id || '');
  const [newMessage, setNewMessage] = useState('');

  if (!currentUser) return <div className="p-8 text-center">Connectez-vous pour accéder à vos messages.</div>;

  const activeConversation = conversations.find(c => c.id === selectedConversationId);

  const handleSend = (e: React.FormEvent) => {
      e.preventDefault();
      if(newMessage.trim()) {
          sendMessage(newMessage);
          setNewMessage('');
      }
  };

  return (
    <div className="bg-slate-50 h-[calc(100vh-64px)] flex">
       {/* Sidebar */}
       <div className="w-full md:w-80 bg-white border-r border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-100">
             <h2 className="text-xl font-bold text-slate-900 mb-4">Messages</h2>
             <div className="relative">
                 <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                 <input 
                    type="text" 
                    placeholder="Rechercher..." 
                    className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
                 />
             </div>
          </div>
          <div className="flex-1 overflow-y-auto">
             {conversations.map(conv => (
                <div 
                    key={conv.id} 
                    onClick={() => setSelectedConversationId(conv.id)}
                    className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors ${selectedConversationId === conv.id ? 'bg-emerald-50 border-r-2 border-emerald-500' : ''}`}
                >
                    <img src={conv.participantAvatar} alt={conv.participantName} className="w-10 h-10 rounded-full" />
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-slate-900 truncate">{conv.participantName}</h3>
                            {conv.unreadCount > 0 && <span className="bg-emerald-500 text-white text-xs px-1.5 py-0.5 rounded-full">{conv.unreadCount}</span>}
                        </div>
                        <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>{conv.lastMessage}</p>
                    </div>
                </div>
             ))}
          </div>
       </div>

       {/* Chat Area */}
       <div className="flex-1 flex flex-col hidden md:flex">
          {activeConversation ? (
            <>
                <div className="p-4 bg-white border-b border-slate-200 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <img src={activeConversation.participantAvatar} alt="" className="w-10 h-10 rounded-full" />
                        <div>
                            <h3 className="font-bold text-slate-900">{activeConversation.participantName}</h3>
                            <span className="text-xs text-green-500 flex items-center gap-1">● En ligne</span>
                        </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="h-5 w-5" /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                    {messages.map(msg => {
                        const isMe = msg.senderId === currentUser.id || msg.senderId === 'me';
                        return (
                            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${isMe ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'}`}>
                                    <p>{msg.content}</p>
                                    <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-emerald-200' : 'text-slate-400'}`}>{msg.timestamp}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="p-4 bg-white border-t border-slate-200">
                    <form onSubmit={handleSend} className="flex gap-2">
                        <input 
                            type="text" 
                            className="flex-1 border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            placeholder="Écrivez votre message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button type="submit" className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-colors">
                            <Send className="h-5 w-5" />
                        </button>
                    </form>
                </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400">
                Sélectionnez une conversation pour commencer.
            </div>
          )}
       </div>
    </div>
  );
};

export default Messages;
