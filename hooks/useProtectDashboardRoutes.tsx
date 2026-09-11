"use client";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useApiCaller from "./useApiCaller";
import getTranslatedRole from "@/helper/getTranslatedRole";

const useProtectDashboard = () => {
  const { userData, setUserData, isAuthUserLoading } = useAuth();
  const [isDashboard, setIsDashboard] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dashboradRoutes = [
    "admin",
    "handwerker",
    "kunde",
    "client",
  ];

  useEffect(() => {
    let toastId: string | number | undefined;
    if (isAuthUserLoading) {
      toastId = toast.loading("Bitte warten …");
    } else {
      toast.dismiss();
    }
  }, [isAuthUserLoading]);

  const apiCaller = useApiCaller();

  useEffect(() => {
    if (isAuthUserLoading || !pathname) return;
 
    const path = pathname.split("/");
    const userRole = userData[0]?.role;

    if (userRole && dashboradRoutes.includes(userRole)) {
      const userId_for_admin_req = localStorage.getItem("userId_for_admin_req");

      if (userId_for_admin_req && userData[0]?._id !== userId_for_admin_req) {
        const getUser = async () => {
          try {
            const response = await apiCaller.get(
              `/user?email=${localStorage.getItem("email_for_admin_req")}`
            );
            setUserData([response.data]);
          } catch (error) {}
        };
        getUser();
      }

      // Admin users should stay on admin routes
      if (userRole === "admin") {
        if (path.includes("livedashboard")) {
          setIsDashboard(true);
        } else if (
          userId_for_admin_req &&
          (path[2] === "kunde" || path[2] === "handwerker")
        ) {
          setIsDashboard(true);
        } else if (path[2] === "admin") {
          if (userId_for_admin_req) {
            localStorage.removeItem("userId_for_admin_req");
            localStorage.removeItem("email_for_admin_req");
          }
          setIsDashboard(true);
        } else {
          if (userId_for_admin_req) {
            localStorage.removeItem("userId_for_admin_req");
            localStorage.removeItem("email_for_admin_req");
          }
          router.replace("/dashboard/admin");
          setIsDashboard(true);
        }
      } else {
        const translatedRole =
          getTranslatedRole(userRole) || userRole;
        if (path[2] !== translatedRole) {
          path[2] = translatedRole;
          router.replace(path.join("/"));
          setIsDashboard(true);
        } else {
          setIsDashboard(true);
        }
      }
    } else if (!userRole) {
      if (searchParams && searchParams.get("email_verification")) {
        setIsDashboard(true);
        return;
      }
      router.push("/");
    }
  }, [userData, pathname, searchParams, isAuthUserLoading]);

  console.log("isDashboard", isDashboard);

  return isDashboard;
};
export default useProtectDashboard;
