import React, { useState } from 'react';
import { Bell, Check, X } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';

export function NotificationPanel() {
  const { notifications, unreadCount, markRead, markAllRead, loading } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-background hover:bg-background-secondary text-text-secondary p-2.5 rounded-xl border border-border transition-colors cursor-pointer"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-card rounded-2xl shadow-xl border border-border z-50 overflow-hidden flex flex-col max-h-[80vh]">
          <div className="p-4 border-b border-border flex items-center justify-between bg-background">
            <h3 className="font-bold text-text-primary">Notifications</h3>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button 
                  onClick={markAllRead}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-bold"
                >
                  Mark all read
                </button>
              )}
              <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-text-secondary">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="overflow-y-auto flex-1">
            {loading ? (
              <div className="p-8 text-center text-text-muted text-sm font-medium">Loading...</div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center text-text-muted text-sm font-medium">No notifications yet</div>
            ) : (
              <ul className="divide-y divide-slate-50">
                {notifications.map(n => (
                  <li 
                    key={n._id} 
                    className={`p-4 transition-colors ${!n.isRead ? 'bg-indigo-50/30' : 'hover:bg-background'}`}
                  >
                    <div className="flex gap-3">
                      <div className={`p-2 rounded-full h-fit ${!n.isRead ? 'bg-indigo-100 text-indigo-600' : 'bg-background-secondary text-text-muted'}`}>
                        <Bell className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${!n.isRead ? 'font-bold text-text-primary' : 'font-medium text-text-secondary'}`}>
                          {n.title}
                        </p>
                        <p className="text-xs text-text-muted mt-0.5 line-clamp-2">{n.message}</p>
                        <p className="text-[10px] text-text-muted mt-2">
                          {new Date(n.createdAt).toLocaleDateString()} at {new Date(n.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                      {!n.isRead && (
                        <button 
                          onClick={() => markRead(n._id)}
                          className="self-center p-1.5 text-text-muted hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
