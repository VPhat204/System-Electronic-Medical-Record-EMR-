import React, { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';

const TRANSLATIONS = {
  vi: {
    title: 'Hỗ trợ & Tin nhắn',
    subtitle: 'Phản hồi nhanh trong vòng 5 phút',
    inputPlaceholder: 'Nhập tin nhắn...',
    send: 'Gửi',
    you: 'Bạn',
    autoReply: 'Tin nhắn của bạn đã được ghi nhận. Chúng tôi sẽ phản hồi sớm nhất có thể.',
    online: 'Trực tuyến',
    newMessages: 'tin nhắn mới',
  },
  en: {
    title: 'Support & Messages',
    subtitle: 'Quick response within 5 minutes',
    inputPlaceholder: 'Type a message...',
    send: 'Send',
    you: 'You',
    autoReply: 'Your message has been received. We will respond as soon as possible.',
    online: 'Online',
    newMessages: 'new messages',
  }
};

const INITIAL_MESSAGES = (lang) => [
  {
    id: 1,
    sender: 'system',
    name: 'MedEMR System',
    avatar: null,
    icon: 'medical_services',
    text: lang === 'vi'
      ? 'Chào mừng quản trị viên! Đây là kênh hỗ trợ nội bộ. Bạn có thể nhận và phản hồi các yêu cầu từ nhân viên tại đây.'
      : 'Welcome, Admin! This is the internal support channel. You can receive and respond to staff requests here.',
    time: '08:00',
    isAdmin: false,
  },
  {
    id: 2,
    sender: 'staff',
    name: lang === 'vi' ? 'Bác sĩ Marcus Thorne' : 'Dr. Marcus Thorne',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqViP2uGRjGPiwNYMG0TQERVmBldCrWFVqO5mMomCKRFFz9sZCjAeSLym6F8jmiPMuBQ01SjZx41zfVIBB9BXuEzNnhPiE6RFOH8J5lAjQ0VhYqkVplIBJDvtlC4_nG8ZhN12OkW7o0HQ-VmRww_fOEl_mHptx1VNenf0qWpAYwU9VvWibUVAaxydo9eB6MHTEWMtlt0TnydwQk_niH28eun1RQuX6A6aLrDe_GGQZtpVx9nnE-csl',
    text: lang === 'vi'
      ? 'Kính chào Admin, tôi cần xin nghỉ phép ngày 25/7/2026. Vui lòng xác nhận và cập nhật lịch trực giúp tôi.'
      : 'Hello Admin, I need to request leave on July 25, 2026. Please confirm and update the duty schedule.',
    time: '09:15',
    isAdmin: false,
  },
  {
    id: 3,
    sender: 'staff',
    name: lang === 'vi' ? 'Y tá Linh Nguyễn' : 'Nurse Linh Nguyen',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD222j-zKVlF4y-B1sFb_0OS8hWkogHKCD4h6uAIUr4bxNgxzY1mbsc8imPrhdlaZms-0M5w8GKkpkR1HuVIogAycZ7Mi4wIt_xifYztj9naRTvw3oEHzQQYQDZv2Ixqikea_OxX5nYi-Vy8NY8sZy2PXyqYKrta-SaGhz7JI7ggvelnTjaHDZN1wG15Jn7ahUCAs0cvSRNSb3f1k7c3186GTAaAUe4NNbNIL4UX6auwhPNZGlpvO13',
    text: lang === 'vi'
      ? 'Admin ơi, máy đo huyết áp ở phòng 204 bị hỏng. Cần gửi yêu cầu bảo trì khẩn cấp!'
      : 'Admin, the blood pressure monitor in room 204 is broken. Need to submit an urgent maintenance request!',
    time: '10:42',
    isAdmin: false,
  },
];

export default function AdminChatWidget({ lang }) {
  const { user } = useContext(AuthContext);
  const t = TRANSLATIONS[lang] || TRANSLATIONS['vi'];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => INITIAL_MESSAGES(lang));
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to the bottom on new messages
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input when panel opens and reset unread count
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const adminMessage = {
      id: Date.now(),
      sender: 'admin',
      name: user ? user.fullName : 'Admin',
      avatar: user?.avatar
        ? (user.avatar.startsWith('http') || user.avatar.startsWith('data:image')
          ? user.avatar
          : `http://localhost:5000${user.avatar}`)
        : null,
      icon: 'manage_accounts',
      text: trimmed,
      time: timeStr,
      isAdmin: true,
    };

    setMessages(prev => [...prev, adminMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate auto-reply after 1.5s
    setTimeout(() => {
      setIsTyping(false);
      const replyTime = new Date();
      const replyTimeStr = `${replyTime.getHours().toString().padStart(2, '0')}:${replyTime.getMinutes().toString().padStart(2, '0')}`;
      const reply = {
        id: Date.now() + 1,
        sender: 'system',
        name: 'MedEMR System',
        avatar: null,
        icon: 'smart_toy',
        text: t.autoReply,
        time: replyTimeStr,
        isAdmin: false,
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getAvatarEl = (msg) => {
    if (msg.avatar) {
      return (
        <img
          src={msg.avatar}
          alt={msg.name}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-slate-200 dark:border-slate-700"
        />
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 border border-primary/20 dark:border-slate-600">
        <span className="material-symbols-outlined text-primary dark:text-sky-400 text-[16px]">
          {msg.icon || 'person'}
        </span>
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9990] flex flex-col items-end gap-3">
      {/* Chat Panel */}
      {isOpen && (
        <div
          className="w-[360px] max-h-[520px] bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary to-primary-container dark:from-slate-800 dark:to-slate-900 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  support_agent
                </span>
              </div>
              <div className="text-left">
                <p className="font-label-md text-white font-semibold text-sm">{t.title}</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-white/70 text-[11px]">{t.online}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-[340px] custom-scrollbar bg-slate-50 dark:bg-slate-900/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.isAdmin ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {getAvatarEl(msg)}
                <div className={`max-w-[75%] ${msg.isAdmin ? 'items-end' : 'items-start'} flex flex-col gap-0.5`}>
                  <span className={`text-[10px] font-semibold tracking-wide ${msg.isAdmin ? 'text-primary dark:text-sky-400 text-right' : 'text-on-surface-variant dark:text-slate-400'}`}>
                    {msg.isAdmin ? t.you : msg.name}
                  </span>
                  <div
                    className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.isAdmin
                        ? 'bg-primary text-white rounded-tr-sm'
                        : msg.sender === 'system'
                          ? 'bg-white dark:bg-slate-800 text-on-surface dark:text-slate-100 border border-outline-variant dark:border-slate-700 rounded-tl-sm'
                          : 'bg-white dark:bg-slate-800 text-on-surface dark:text-slate-100 border border-outline-variant dark:border-slate-700 rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">{msg.time}</span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary dark:text-sky-400 text-[16px]">smart_toy</span>
                </div>
                <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 px-3 py-2 rounded-2xl rounded-tl-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="px-3 py-3 bg-white dark:bg-slate-900 border-t border-outline-variant dark:border-slate-800 flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.inputPlaceholder}
              rows={1}
              className="flex-1 resize-none bg-surface-container-low dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-on-surface dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all max-h-24 overflow-y-auto"
              style={{ lineHeight: '1.5' }}
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="w-9 h-9 rounded-xl bg-primary disabled:bg-slate-200 dark:disabled:bg-slate-700 text-white disabled:text-slate-400 flex items-center justify-center hover:bg-primary-container transition-colors cursor-pointer disabled:cursor-not-allowed flex-shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-container dark:from-sky-600 dark:to-indigo-700 text-white shadow-2xl hover:shadow-primary/30 hover:scale-110 transition-all duration-200 flex items-center justify-center cursor-pointer"
      >
        <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: isOpen ? "'FILL' 0" : "'FILL' 1" }}>
          {isOpen ? 'close' : 'chat'}
        </span>
        {/* Unread badge */}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-error rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-sm animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}
