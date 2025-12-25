// components/ui/Modal.tsx
import React, { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
  widthClass?: string; // e.g. "w-[560px]"
};

export default function Modal({
  open,
  onClose,
  children,
  ariaLabel = "Dialog",
  widthClass = "w-[min(92vw,560px)]",
}: ModalProps) {
  const root = useMemo(() => {
    let el = document.getElementById("modal-root");
    if (!el) {
      el = document.createElement("div");
      el.id = "modal-root";
      document.body.appendChild(el);
    }
    return el;
  }, []);

  const cardRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Autofocus the first focusable element
  useEffect(() => {
    if (!open) return;
    const el = cardRef.current;
    if (!el) return;
    const toFocus =
      el.querySelector<HTMLElement>(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      ) || el;
    toFocus.focus();
  }, [open]);

  if (!open) return null;

  const node = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      className="fixed inset-0 z-[1000]"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Card container */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${widthClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={cardRef}
          className="outline-none overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-black/5 animate-[zoomIn_.18s_ease]"
          tabIndex={-1}
        >
          {children}
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes zoomIn {
          from { transform: scale(.96); opacity: 0 }
          to   { transform: scale(1);  opacity: 1 }
        }
      `}</style>
    </div>
  );

  return createPortal(node, root);
}
