import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ModalWrapperProps {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function ModalWrapper({
  onClose,
  children,
  className = ""
}: ModalWrapperProps) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Find or create modal root element
    let element = document.getElementById("modal-root");
    if (!element) {
      element = document.createElement("div");
      element.id = "modal-root";
      document.body.appendChild(element);
    }
    setModalRoot(element);

    // Add body class to prevent scrolling when modal is open
    document.body.style.overflow = "hidden";

    // Cleanup function
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Click outside to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 bg-black/30 text-secondary-700 flex items-center justify-center z-50 p-4 *:max-h-[90vh] *:overflow-auto ${className}`}
      onClick={handleBackdropClick}
    >
      {children}
    </div>,
    modalRoot
  );
}
