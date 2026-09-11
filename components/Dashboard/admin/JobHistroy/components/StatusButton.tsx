import React from "react";
import {
  FaCheck,
  FaCheckCircle,
  FaEdit,
  FaTimes,
  FaTimesCircle,
  FaTrash,
} from "react-icons/fa";

interface StatusButtonProps {
  status: string;
  showIcons?: boolean;
}

const StatusButton: React.FC<StatusButtonProps> = ({
  status,
  showIcons = true,
}) => {
  const getStatusStyles = () => {
    let styles =
      "rounded px-3 py-1 cursor-pointer flex gap-2 items-center capitalize";

    if (status === "completa") {
      styles += " bg-[#ff691880]";
    } else if (status === "eliminada") {
      styles += " bg-[#FA4017]";
    } else if (status === "abierta") {
      styles += " bg-[#67B554]";
    } else if (status === "aceptada") {
      styles += " bg-[#fff61880]";
    }
    return styles;
  };

  const getStatusIcon = () => {
    if (status === "completa" || status === "abierta") {
      return <FaCheck className="mr-1" />;
    } else if (status === "eliminada") {
      return <FaTimesCircle className="mr-1" />;
    }
  };

  return (
    <div className="flex items-center gap-2">
      {status == "abierta" && showIcons && (
        <span className="flex gap-1">
          <FaTrash fontSize={20} />
          <FaEdit fontSize={20} />
        </span>
      )}
      <div className={getStatusStyles()}>
        {status} {getStatusIcon()}
      </div>
    </div>
  );
};

export default StatusButton;
