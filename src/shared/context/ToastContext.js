import React, { createContext, useState, useCallback } from 'react';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  const success = useCallback((msg, dur) => showToast(msg, 'success', dur), [showToast]);
  const error = useCallback((msg, dur) => showToast(msg, 'error', dur), [showToast]);
  const warning = useCallback((msg, dur) => showToast(msg, 'warning', dur), [showToast]);
  const info = useCallback((msg, dur) => showToast(msg, 'info', dur), [showToast]);

  return (
    <ToastContext.Provider value={{ success, error, warning, info, toasts }}>
      {children}

      {/* Toast Render Area */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-2xl border text-white font-medium pointer-events-auto transition-all duration-300 animate-slide-in ${
              toast.type === 'success'
                ? 'bg-emerald-600 border-emerald-500'
                : toast.type === 'error'
                  ? 'bg-rose-600 border-rose-500'
                  : toast.type === 'warning'
                    ? 'bg-amber-500 border-amber-400'
                    : 'bg-blue-600 border-blue-500'
            }`}
          >
            <span className="material-symbols-outlined">
              {toast.type === 'success'
                ? 'check_circle'
                : toast.type === 'error'
                  ? 'error'
                  : toast.type === 'warning'
                    ? 'warning'
                    : 'info'}
            </span>
            <span className="text-sm">{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastContext;
