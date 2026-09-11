"use client";
import useUserRequests from "@/ApiRequests/user";
import ModalStruc from "@/components/Common/ModalStruc";
import { useAuth } from "@/context/AuthContext";
import clientError from "@/helper/clientError";
import useChat from "@/hooks/useChat";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, XCircle, FileText, MessageSquare, Send, Clock } from "lucide-react";
import DeclineReason from "./declineReason";
import OpenDocs from "./openDocs";

export default function VerificationCard({
  name,
  time,
  message,
  documents,
  user,
  status,
  isViewing,
}: {
  name: string;
  time: string;
  message: string;
  documents: any;
  user: string;
  status: string;
  isViewing?: boolean;
}) {
  const { userData } = useAuth();
  const [isCustomMessage, setIsCustomMessage] = useState(false);
  const [isOpenDoc, setIsOpenDoc] = useState(false);
  const [isDecline, setIsDecline] = useState(false);
  
  const handleOpen = () => setIsOpenDoc(!isOpenDoc);
  const handleError = clientError();
  const { UpdateCraftman } = useUserRequests();

  const handleUpdate = async (status: string, reason: string = "") => {
    try {
      if (status === "declined" && reason === "") {
        return setIsDecline(true);
      }
      await UpdateCraftman.mutateAsync(
        { status, user, message: reason },
        {
          onSuccess() {
            toast.success(status === "verified" ? "Akzeptiert" : "Abgelehnt");
            setIsDecline(false);
          },
        }
      );
    } catch (error) {
      handleError(error);
    }
  };

  const { createCoversation, inputMessage, setInputMessage, isCreatingConv } = useChat();
  
  const handleMessageSent = async (e: any) => {
    e.preventDefault();
    createCoversation(user);
  };

  useEffect(() => {
    !isCreatingConv && setIsCustomMessage(false);
  }, [isCreatingConv]);

  return (
    <div className="group bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-premium hover:border-orange/20 transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="font-black text-2xl text-secondary group-hover:text-orange transition-colors">
            {name}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
            <Clock size={14} />
            <span>
              {formatDistanceToNow(time ? new Date(time) : new Date(), {
                addSuffix: true,
                locale: de,
              })}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsCustomMessage(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl text-sm font-bold transition-all"
          >
            <MessageSquare size={16} />
            Nachricht
          </button>

          {!isViewing && (
            <button
              onClick={handleOpen}
              disabled={documents?.length === 0}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                documents?.length === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-orange/10 text-orange hover:bg-orange hover:text-white"
              }`}
            >
              <FileText size={16} />
              {documents?.length !== 0 ? "Dokumente" : "Keine Docs"}
            </button>
          )}

          {status !== "verified" && (
            <button
              onClick={() => handleUpdate("verified")}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl text-sm font-bold transition-all"
            >
              <CheckCircle2 size={16} />
              Akzeptieren
            </button>
          )}

          {status !== "declined" && (
            <button
              onClick={() => handleUpdate("declined")}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl text-sm font-bold transition-all"
            >
              <XCircle size={16} />
              Ablehnen
            </button>
          )}
        </div>
      </div>

      {message && (
        <div className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-100 italic text-gray-500 text-sm">
          "{message}"
        </div>
      )}

      <OpenDocs
        isOpen={isOpenDoc}
        onClose={handleOpen}
        documentUrls={documents}
        userId={user}
        companyName={name}
      />

      <DeclineReason
        isOpen={isDecline}
        onClose={() => setIsDecline(false)}
        handleUpdate={handleUpdate}
        isPending={UpdateCraftman.isPending}
      />

      <ModalStruc
        isOpen={isCustomMessage}
        closeModal={() => setIsCustomMessage(false)}
      >
        <div className="p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-black text-secondary">Nachricht senden</h2>
            <p className="text-gray-500 text-sm mt-1">Senden Sie eine Nachricht an {name}</p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleMessageSent}>
            <textarea
              onChange={(e) => setInputMessage(e.target.value)}
              value={inputMessage}
              className="w-full h-40 p-5 bg-gray-50 border-transparent border-2 rounded-2xl outline-none focus:border-blue-500/20 focus:bg-white transition-all font-medium resize-none"
              placeholder="Ihre Nachricht hier..."
            ></textarea>
            <button
              type="submit"
              disabled={isCreatingConv}
              className="w-full bg-secondary hover:bg-primary text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isCreatingConv ? "Wird gesendet..." : "Senden"}
              {!isCreatingConv && <Send size={18} />}
            </button>
          </form>
        </div>
      </ModalStruc>
    </div>
  );
}
