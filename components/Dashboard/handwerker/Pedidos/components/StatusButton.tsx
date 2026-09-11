"use client";

import useUpdateJobpost from "@/hooks/useUpdateJob";
import React from "react";
import { Check, XCircle, Trash2, Clock, CheckCircle2, RotateCcw, ShieldAlert } from "lucide-react";

interface StatusButtonProps {
  status: string;
  jobId?: string;
  getUserPostedJobFN?: () => Promise<void>;
  showIcons?: boolean;
  showEditIcon?: boolean;
  setIsEdit?: any;
  onEditClick?: () => void;
}

const StatusButton: React.FC<StatusButtonProps> = ({
  showIcons = true,
  showEditIcon = true,
  status,
  setIsEdit,
}) => {
  const s = status?.toLowerCase();

  const getStatusStyles = () => {
    let baseStyles = "rounded-full px-4 py-1.5 flex gap-2 items-center text-[10px] font-black uppercase tracking-widest transition-all duration-300 border shadow-sm";

    if (["terminada", "terminiert", "aceptada", "akzeptiert"].includes(s)) {
      return `${baseStyles} bg-emerald-50 text-emerald-600 border-emerald-100`;
    } else if (["cerca", "rechazada", "abgelehnt"].includes(s)) {
      return `${baseStyles} bg-red-50 text-red-600 border-red-100`;
    } else if (["pendiente", "abierta", "offen"].includes(s)) {
      return `${baseStyles} bg-orange/5 text-orange border-orange/10`;
    } else if (["retirada", "zurückgezogen"].includes(s)) {
      return `${baseStyles} bg-slate-50 text-slate-500 border-slate-200`;
    }
    return `${baseStyles} bg-gray-50 text-gray-500 border-gray-200`;
  };

  const getStatusIcon = () => {
    if (["terminada", "terminiert", "aceptada", "akzeptiert"].includes(s)) {
      return <CheckCircle2 size={12} />;
    } else if (["cerca", "rechazada", "abgelehnt"].includes(s)) {
      return <XCircle size={12} />;
    } else if (["pendiente", "abierta", "offen"].includes(s)) {
      return <Clock size={12} />;
    } else if (["retirada", "zurückgezogen"].includes(s)) {
      return <RotateCcw size={12} />;
    }
    return <ShieldAlert size={12} />;
  };

  const handleClose = () => {
    try {
      setIsEdit("status");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {showEditIcon && showIcons && s === "abierta" && (
        <button
          onClick={handleClose}
          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          title="Löschen"
        >
          <Trash2 size={18} />
        </button>
      )}
      <div className={getStatusStyles()}>
        {getStatusIcon()}
        {status}
      </div>
    </div>
  );
};

export default StatusButton;
