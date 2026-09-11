"use client";
import CustomConfirmPrompt from "@/components/Modals/CustomConfirmPromp";
import { useState } from "react";

const ChangeProfileStatus = ({
  onSubmit,
  value,
  isUpdating,
  identifier,
}: {
  onSubmit: any;
  value: string;
  isUpdating: boolean;
  identifier: string;
}) => {
  const statuses: string[] = ["active", "inactive"];
  const [selectedStatus, setSelectedStatus] = useState<string>(value);
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };
  const [confirmPrompt, setConfirmPrompt] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <select
        value={selectedStatus}
        onChange={handleStatusChange}
        className="border p-2 mb-4"
      >
        <option defaultValue={""} value={""}>
          Selecciona un motivo
        </option>
        {statuses
          .filter((i) => i !== value)
          .map((status) => (
            <option key={status} value={status}>
              {status === "active" ? "activo" : "inactivo"}
            </option>
          ))}
      </select>
      <button
        onClick={() => setConfirmPrompt(true)}
        className="globalbtn disabled:opacity-50"
        disabled={isUpdating}
      >
        Cambiar estado
      </button>
      <CustomConfirmPrompt
        promptText={`¿estás seguro de que deseas cambiar el estado?`}
        onCancel={() => setConfirmPrompt(false)}
        onConfirm={() => onSubmit(selectedStatus, identifier)}
        isOpen={confirmPrompt}
        isLoading={isUpdating}
      />
    </div>
  );
};

export default ChangeProfileStatus;
