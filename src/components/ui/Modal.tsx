"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className={cn(
          "relative glass-strong rounded-2xl p-6 w-full max-w-lg animate-scale-in",
          "border border-white/10 shadow-[0_0_40px_rgba(0,240,255,0.1)]",
          className
        )}
      >
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="text-xl font-display font-bold neon-text">{title}</h3>}
          <button
            onClick={onClose}
            className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <IoClose size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
