// src/components/Home/LogoutConfirmationModal.tsx (example path)

"use client";

import React from "react";

// Define the type for the component's props
interface LogoutConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void; // Function that takes no arguments and returns nothing
  onConfirm: () => void; // Function that takes no arguments and returns nothing
}

const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  // If the modal is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  // Prevent click propagation inside the modal content to the background overlay
  const handleModalContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    // Overlay covering the entire screen
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-200 ease-in-out"
      onClick={onClose} // Add onClick to overlay to close the modal when clicking outside
      aria-modal="true" // Indicate this is a modal dialog
      role="dialog" // ARIA role for dialog
    >
      {/* Modal Content */}
      <div
        className="bg-white p-6 rounded-[16px] shadow-xl max-w-sm w-full mx-4 transform transition-all duration-200 ease-in-out scale-100 opacity-100"
        onClick={handleModalContentClick} // Prevent closing when clicking inside modal content
        role="document" // Content represents the document structure of the dialog
      >
        <h2 className="text-lg font-semibold mb-4 text-[#191919]">
          Confirmation de Déconnexion
        </h2>
        <p className="mb-6 text-[#324054]">
          Êtes-vous sûr de vouloir vous déconnecter ?
        </p>
        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose} // Use the passed-in onClose function
            className="px-4 py-2 text-[15px] rounded-[24px] border border-gray-300 text-[#324054] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors duration-150"
            aria-label="Annuler la déconnexion"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm} // Use the passed-in onConfirm function
            className="px-4 py-2 text-[15px] rounded-[24px] bg-[#F64C4C] text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-150"
            aria-label="Confirmer la déconnexion"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;
