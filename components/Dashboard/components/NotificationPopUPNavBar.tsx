"use client";
import useNotificationRequests from "@/ApiRequests/notification";
import { Notification } from "@/context/NotificationContext";
import clientError from "@/helper/clientError";
import useOutsideClick from "@/hooks/useOutsideClick";
import useScrollFetch from "@/hooks/useScrollFetchs";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useRef } from "react";
import { IoNotificationsOutline } from "react-icons/io5";

export function NotificationPopUPNavBar({ item }: { item: Notification }) {
  return (
    <div className="w-[15rem] sm:w-[20rem] space-y-3">
      <Link
        href={item.content.link as string}
        className="cursor-pointer hover:bg-gray-100  px-3 py-2 block"
      >
        <span> {item?.content.text} </span>
      </Link>
    </div>
  );
}

const NotificationItem = ({ _id, text, time, link, unread, onRead }: any) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        onRead(_id);
        router.push(link);
      }}
      className="flex cursor-pointer items-start gap-2 w-[300px] border-b border-gray-200 p-4 hover:bg-gray-50"
    >
      {unread && (
        <span>
          <span className="h-2 w-2 bg-red-500 block rounded-full mt-2"></span>
        </span>
      )}
      <div className="flex-grow">
        <p
          className={`text-sm font-medium ${
            unread ? "text-black" : "text-gray-600"
          }`}
        >
          <span> {text}</span>
        </p>
        <p className="text-xs text-gray-400">{formatDistanceToNow(time ? new Date(time) : new Date(), { addSuffix: true, locale: de })}</p>
      </div>
    </div>
  );
};

const NotificationBar = ({
  messageToggle,
  setMessageToggle,
  removeOtherBar,
}: {
  messageToggle: Boolean;
  setMessageToggle: React.Dispatch<React.SetStateAction<Boolean>>;
  removeOtherBar: () => void;
}) => {
  const { UpdateNotification, GetNotification } = useNotificationRequests();
  const handleError = clientError();

  const handleRead = async (id: string) => {
    try {
      await UpdateNotification.mutateAsync({
        notificationId: id,
      });
    } catch (error) {
      handleError(error);
    }
  };

  const { data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } =
    GetNotification({ pageSize: 10 }, {});

  const { handleScroll } = useScrollFetch({
    hasNextPage,
    fetchNextPage,
  });

  let unreadNotification = data?.pages?.[0].unReadNotification;

  const ref = useRef<HTMLDivElement>(null);
  const handleOutsideClick = () => {
    setMessageToggle(false);
  };
  useOutsideClick(ref, handleOutsideClick);

  const notificationBarClass = `absolute min-w-[300px] h-[400px] right-0 top-7 transition-all duration-300 ${
    messageToggle ? "opacity-100" : "opacity-0 pointer-events-none"
  }`;
  return (
    <div className="relative" ref={ref}>
      <IoNotificationsOutline
        className="text-2xl cursor-pointer "
        onClick={() => {
          setMessageToggle(!messageToggle);
          removeOtherBar();
        }}
      />
      {unreadNotification > 0 && (
        <span className="absolute -top-4 -right-2 bg-orange text-white px-[8px] rounded-full">
          {unreadNotification}
        </span>
      )}
      {
        <div className={notificationBarClass}>
          <div
            onScroll={handleScroll}
            className="bg-white shadow-md h-full overflow-auto rounded border border-gray-200"
          >
            <button
              onClick={() => handleRead("")}
              disabled={unreadNotification === 0}
              className="sticky top-0 z-10 px-4 w-full bg-red-500 text-white font-semibold py-2 text-left"
            >
              Als gelesen markieren
            </button>
            <hr />
            {data?.pages.map((page: any, ind: number) => (
              <Fragment key={ind}>
                {page?.data?.map((notification: any) => (
                  <div key={notification._id}>
                    <NotificationItem
                      text={notification.content.text}
                      link={notification.content.link}
                      time={notification.createdAt}
                      unread={!notification.read}
                      onRead={handleRead}
                      _id={notification._id}
                    />
                  </div>
                ))}
              </Fragment>
            ))}
            {hasNextPage && isFetchingNextPage && (
              <b className="block text-center">Lädt…</b>
            )}
            {data?.pages[0]?.data?.length === 0 && (
              <b className="block text-center">Keine Benachrichtigungen</b>
            )}
          </div>
        </div>
      }
    </div>
  );
};

export default NotificationBar;
