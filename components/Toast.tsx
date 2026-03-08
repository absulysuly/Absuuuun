import React from 'react';

interface ToastProps {
  message: string;
  onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onDismiss }) => (
  <div
    className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-sm px-4 py-2 rounded-full shadow-lg z-50 animate-fade-in"
    role="status"
    onClick={onDismiss}
  >
    {message}
  </div>
);

export default Toast;
