"use client";

import Modal from "@/components/ui/Modal";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

interface BlockAdModalProps {
  isOpen: boolean;
  isLoading: boolean;
  jobTitle: string;
  onCancel: () => void;
  onConfirm: (reason: string) => void;
}

const MAX_REASON_LENGTH = 500;

export default function BlockAdModal({
  isOpen,
  isLoading,
  jobTitle,
  onCancel,
  onConfirm,
}: BlockAdModalProps) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (isOpen) setReason("");
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel="Anzeige sperren"
      className="relative w-[92vw] max-w-lg mx-auto p-6 rounded-xl bg-white shadow-premium outline-none"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-slate-950/50"
    >
      <button
        className="absolute top-5 right-5 text-slate-400 hover:text-red-500 focus:outline-none"
        onClick={onCancel}
        aria-label="Schließen"
      >
        <FaTimes />
      </button>

      <h2 className="font-outfit text-xl font-bold text-slate-950">
        Anzeige sperren
      </h2>
      <p className="mt-2 text-sm text-slate-600 font-inter">
        „{jobTitle}“ wird sofort aus der öffentlichen Suche entfernt und nimmt
        keine neuen Angebote mehr an. Der Auftraggeber sieht die Begründung in
        seinem Dashboard. Die Sperre kann jederzeit aufgehoben werden.
      </p>

      <label
        htmlFor="block-reason"
        className="block mt-5 mb-2 text-sm font-semibold text-slate-950 font-inter"
      >
        Begründung (optional)
      </label>
      <textarea
        id="block-reason"
        rows={3}
        maxLength={MAX_REASON_LENGTH}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="z. B. Verstoß gegen die Nutzungsbedingungen"
        className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <p className="mt-1 text-right text-xs text-slate-400">
        {reason.length}/{MAX_REASON_LENGTH}
      </p>

      <div className="mt-5 flex justify-end gap-3">
        <button
          type="button"
          disabled={isLoading}
          onClick={onCancel}
          className="rounded-lg border border-slate-200 px-6 py-2.5 font-montserrat font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
        >
          Abbrechen
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => onConfirm(reason)}
          className="rounded-lg bg-red-500 px-6 py-2.5 font-montserrat font-bold text-white hover:bg-red-600 disabled:opacity-40"
        >
          {isLoading ? "Wird gesperrt..." : "Anzeige sperren"}
        </button>
      </div>
    </Modal>
  );
}
