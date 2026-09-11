// utils/auth.ts
import { useAuth } from "@/context/AuthContext";
import { queryClient } from "@/lib/queryClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const router = useRouter();
  const { setUserData } = useAuth();
  const logout = () => {
    // Remove the authentication tokens from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Redirect to the login page using the router
    setUserData([]);
    router.replace("/");
    toast.success("Erfolgreich abgemeldet");
    queryClient.clear();
  };

  return logout;
};
