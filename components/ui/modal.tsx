// components/ui/modal.tsx
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import confettiLib from "canvas-confetti";
import { CgClose } from "react-icons/cg";

type Status = "success" | "error";
export type Anchor = { x: number; y: number } | { rect: DOMRect } | null;

interface Props {
  open: boolean;
  status: Status;
  title?: string;
  message?: string;
  pointsText?: string;
  anchor?: Anchor;
  onClose: () => void;
}

export default function RewardConfirmModal({
  open,
  status,
  title = status === "success" ? "Level Up!" : "Something went wrong",
  message = status === "success"
    ? "You've claimed your points. Come back tomorrow for more!"
    : "We couldn't complete this action. Please try again.",
  pointsText,
  anchor = null,
  onClose,
}: Props) {
  // ----- Always declare hooks in the same order (no early returns above this line)
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);

  // Create/find the portal root AFTER mount (client-only)
  useEffect(() => {
    if (typeof document === "undefined") return;
    let el = document.getElementById("modal-root") as HTMLElement | null;
    if (!el) {
      el = document.createElement("div");
      el.id = "modal-root";
      document.body.appendChild(el);
    }
    setPortalEl(el);
  }, []);

  // Confetti inside the modal
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiRef = useRef<ReturnType<typeof confettiLib.create> | null>(
    null
  );

  useEffect(() => {
    if (!open || status !== "success") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Size canvas to card
    const parent = canvas.parentElement;
    if (parent) {
      const r = parent.getBoundingClientRect();
      canvas.width = r.width;
      canvas.height = r.height;
    }

    confettiRef.current = confettiLib.create(canvas, {
      resize: false,
      useWorker: true,
    });

    // burst(s)
    confettiRef.current?.({
      particleCount: 90,
      spread: 70,
      startVelocity: 35,
      scalar: 0.9,
      origin: { x: 0.5, y: 0.3 },
    });
    confettiRef.current?.({
      particleCount: 60,
      spread: 50,
      startVelocity: 25,
      scalar: 0.8,
      origin: { x: 0.2, y: 0.2 },
    });

    return () => {
      confettiRef.current = null;
    };
  }, [open, status]);

  // Compute anchor -> center deltas (safe to do every render)
  const cx = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
  const cy = typeof window !== "undefined" ? window.innerHeight / 2 : 0;
  let sx = cx,
    sy = cy;
  if (anchor) {
    if ("rect" in anchor && anchor.rect) {
      sx = anchor.rect.left + anchor.rect.width / 2;
      sy = anchor.rect.top + anchor.rect.height / 2;
    } else if ("x" in anchor && "y" in anchor) {
      sx = anchor.x;
      sy = anchor.y;
    }
  }
  const dx = sx - cx;
  const dy = sy - cy;

  // ----- Only now decide to render nothing
  if (!open || !portalEl) return null;

  const node = (
    <div
      aria-modal
      role="dialog"
      className="fixed inset-0 z-[1000]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/45" />
      <div
        className="absolute left-1/2 top-1/2 w-[min(92vw,560px)]"
        onClick={(e) => e.stopPropagation()}
        style={
          {
            animation: "modalIn .28s ease forwards",
            "--dx": `${dx}px`,
            "--dy": `${dy}px`,
            willChange: "transform, opacity",
          } as React.CSSProperties
        }
      >
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
          <button className="absolute top-4 right-4">
            <CgClose size={20} onClick={onClose} />
          </button>
          {/* Confetti canvas stays inside the modal */}
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0"
          />

          <div className="flex items-center justify-center pt-7">
            {status === "success" ? (
              <img alt="check" src="/check.gif" className="h-20" />
            ) : (
              <div className="grid h-14 w-14 place-items-center rounded-full bg-rose-100 text-rose-600">
                !
              </div>
            )}
          </div>

          <h3 className="mt-3 text-center text-xl font-semibold text-[24px]  text-primary-500">
            {title}
          </h3>

          <p className="text-[36px] font-extrabold my-2.5 bg-linear-to-br from-primary-500 to-[#FF9FF5] text-center  bg-clip-text text-transparent [text-shadow:1px_1px_3px_rgba(0,0,0,0.1)]">
            {pointsText}
          </p>

          <p className="mx-auto mb-6 mt-2 max-w-[36ch] text-center text-sm text-slate-600">
            {message}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0.86);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </div>
  );

  return createPortal(node, portalEl);
}
