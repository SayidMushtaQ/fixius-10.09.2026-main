"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, Edit, Trash2 } from "lucide-react";

interface Column {
  header: string;
  key: string;
  width?: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface AdminDataTableProps {
  columns: Column[];
  data: any[];
  onAction?: (action: string, item: any) => void;
  /** Replaces the default view/edit/delete buttons with custom controls. */
  renderActions?: (item: any) => React.ReactNode;
  actionsHeader?: string;
  emptyLabel?: string;
  isLoading?: boolean;
}

export default function AdminDataTable({
  columns,
  data,
  onAction,
  renderActions,
  actionsHeader = "Aktionen",
  emptyLabel = "Keine Daten gefunden",
  isLoading,
}: AdminDataTableProps) {
  const hasActions = Boolean(onAction || renderActions);
  if (isLoading) {
    return (
      <div className="w-full h-48 flex items-center justify-center bg-white rounded-3xl shadow-premium animate-pulse">
        <div className="text-gray-400 font-medium">Laden...</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-3xl shadow-premium overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-8 py-5 text-sm font-bold text-secondary tracking-wide uppercase"
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
              {hasActions && (
                <th className="px-8 py-5 text-sm font-bold text-secondary tracking-wide uppercase text-right">
                  {actionsHeader}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, rowIdx) => (
                <motion.tr
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: rowIdx * 0.05 }}
                  key={item.id || rowIdx}
                  className="group hover:bg-primary/5 transition-colors border-b border-gray-50 last:border-0"
                >
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-8 py-5">
                      <div className="text-secondary/70 font-medium text-sm group-hover:text-secondary transition-colors">
                        {col.render
                          ? col.render(item[col.key], item)
                          : item[col.key] || "—"}
                      </div>
                    </td>
                  ))}
                  {hasActions && (
                    <td className="px-8 py-5 text-right">
                      {renderActions ? (
                        <div className="flex justify-end items-center gap-2">
                          {renderActions(item)}
                        </div>
                      ) : (
                      <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onAction?.("view", item)}
                          className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
                          title="Ansehen"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => onAction?.("edit", item)}
                          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                          title="Bearbeiten"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => onAction?.("delete", item)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          title="Löschen"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      )}
                    </td>
                  )}
                </motion.tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="px-8 py-20 text-center text-gray-400 italic"
                >
                  {emptyLabel}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
