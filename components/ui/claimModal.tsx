// components/ui/ClaimReclaimModal.tsx
import React, { useState } from "react";
import Modal from "./reuseable-modal";
import { FiDownloadCloud } from "react-icons/fi";
import { toast } from "react-toastify";

// simple

// promise flow (perfect for “Claim” button)

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: { email: string; file: File }) => Promise<void> | void;
  points?: number; // default 25
};

export default function ClaimReclaimModal({
  open,
  onClose,
  onSubmit,
  points = 25,
}: Props) {
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailValid = /\S+@\S+\.\S+/.test(email);
  const fileValid = !!file;
  const canSubmit = emailValid && fileValid && !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || !file) return;

    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({ email, file });
      onClose();
      toast.success("Your claim was submitted successfully! 🎉");
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      ariaLabel={`Claim your ${points} points`}
    >
      {/* Header */}
      <div className="flex items-center justify-between  px-5 py-10">
        <h3 className="text-[18px] font-semibold">
          Claim Your {points} Points
        </h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="rounded p-1 text-slate-500 hover:bg-slate-100"
        >
          ×
        </button>
      </div>

      {/* Body */}
      <form onSubmit={handleSubmit} className="px-5 pt-4 pb-5">
        <p className="text-[13.5px] text-slate-600">
          Sign up for Reclaim (free, no payment needed), then fill the form
          below:
        </p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-[13.5px] text-slate-700">
          <li>Enter your Reclaim sign-up email.</li>
          <li>
            Upload a screenshot of your Reclaim profile showing your email.
          </li>
          <p className="text-slate-500">
            After verification, you’ll get {points} Flowva Points! 🎉😊
          </p>
        </ol>

        {/* Email */}
        <label className="mt-4 block text-[13px] font-medium text-slate-700">
          Email used on Reclaim
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-[14px] outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
        />

        {/* File */}
        <label className="mt-4 block text-[13px] font-medium text-slate-700">
          Upload screenshot (mandatory)
        </label>
        <div className="mt-1">
          <label className="flex cursor-pointer items-center gap-3 justify-center rounded-md border border-slate-300 px-3 py-2 text-[14px] hover:bg-slate-50">
            <FiDownloadCloud size={20} />
            <span className="text-slate-500">{"Choose file"}</span>
            <input
              type="file"
              accept="image/*,.png,.jpg,.jpeg,.webp"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
          {file && (
            <span className="text-slate-500 text-xs text-center w-full">
              {file?.name}
            </span>
          )}
        </div>

        {error && (
          <div className="mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-[13px] text-rose-700">
            {error}
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!canSubmit}
            className={`h-10 rounded-lg px-4 text-sm font-semibold text-white transition ${
              canSubmit
                ? "bg-primary-500 hover:bg-primary-600"
                : "cursor-not-allowed bg-slate-300"
            }`}
          >
            {submitting ? "Submitting..." : "Submit Claim"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
