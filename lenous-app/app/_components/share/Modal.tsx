import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className=" bg-dark-gray p-4 rounded-lg shadow-lg w-96">
        <div className="flex justify-end ">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-dark-gray text-white text-xs rounded-md shadow-sm0"
          >
            Close
          </button>
        </div>
        {title && (
          <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
