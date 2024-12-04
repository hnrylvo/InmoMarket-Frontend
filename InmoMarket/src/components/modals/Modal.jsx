import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ children, onClose, className = '' }) => {
  const handleOverlayClick = (e) => {
    // Close modal only if clicking on the overlay background
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div 
        className={`relative w-full max-w-lg bg-white rounded-xl shadow-xl ${className}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
        
        {children}
      </div>
    </div>
  );
};

export default Modal;