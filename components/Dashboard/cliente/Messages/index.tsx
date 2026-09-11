"use client";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import { useChatContext } from "@/context/ChatContext";
import { useEffect, useState } from "react";
import Messages from "../../components/Messages";
import { NotFoundData } from "../../handwerker/Pedidos";

export default function Index() {
  const { conversations, isLoading, refetch } = useChatContext();
  const { userData } = useAuth();
  const user = userData[0];
  const [isAdminView, setIsAdminView] = useState(false);

  useEffect(() => {
    // Check if admin is viewing this dashboard
    if (typeof window !== "undefined") {
      const adminViewId = localStorage.getItem("userId_for_admin_req");
      setIsAdminView(!!adminViewId);
    }
  }, []);

  useEffect(() => {
    if (!isAdminView) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdminView]);

  if (isLoading && !isAdminView) {
    return <Loader />;
  }

  // Block admin from viewing user messages
  if (isAdminView) {
    return (
      <div className="w-full my-12">
        <section className="my-8">
          <h1 className="font-bold text-4xl text-Heading">
            <span className="text-orange font-bold">Zugriff eingeschränkt</span>
          </h1>
        </section>
        <div className="rounded-md p-8 bg-gray-100 text-center">
          <p className="text-gray-600">
            Administratoren können aus Datenschutzgründen keine
            Benutzernachrichten einsehen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full  my-12`}>
      <section className="  my-8">
        <h1 className="font-bold text-4xl text-Heading">
          Kommunizieren Sie ganz einfach
          <span className="text-orange font-bold">Ihr Nachrichten-Center</span>
        </h1>
      </section>
      <div className="rounded-md h-[18rem] flex flex-col gap-5">
        {conversations && conversations.length > 0 ? (
          conversations?.map((item: any) => {
            let sender = item.participants.find(
              (i: any) => i?._id !== user?._id
            );
            if (sender && sender?.role === "handwerker") {
              sender = {
                ...sender,
                name: sender?.craftsman?.company_name,
              };
            }

            const lastMessage = item?.messages[item?.messages?.length - 1];
            return (
              <Messages
                convId={item._id}
                key={item._id}
                lastMessage={lastMessage}
                sender={sender}
                message={item.messages}
              />
            );
          })
        ) : (
          <NotFoundData text="Keine Nachrichten gefunden" />
        )}
      </div>
    </div>
  );
}
