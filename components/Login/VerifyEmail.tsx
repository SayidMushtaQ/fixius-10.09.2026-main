"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Loader from "@/components/Loader";

export default function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isVerifying = useRef(false);

  useEffect(() => {
    // Prevent double execution in strict mode
    if (isVerifying.current) return;
    
    const verify = async () => {
      if (!searchParams) return;
      
      const email = searchParams.get("email");
      const id = searchParams.get("id");
      
      if (!email || !id) {
        // If parameters are missing, redirect to home
        // router.push("/"); // Uncomment if you want to skip verification without params
        return;
      }

      isVerifying.current = true;
      try {
        const queryData = Object.fromEntries(searchParams.entries());
        const responseOfVerification = await axios.post("/api/verify_email", {
          queryData,
        });

        if (
          responseOfVerification.status === 200 &&
          responseOfVerification.data.matched
        ) {
          const role = responseOfVerification.data.role;
          if (role === "admin") {
            router.push("/dashboard/admin");
          } else if (role === "handwerker") {
            router.push("/dashboard/handwerker");
          } else {
            router.push("/dashboard/kunde");
          }
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Email verification failed:", error);
        router.push("/");
      }
    };

    verify();
  }, [searchParams, router]);

  return (
    <div className="flex justify-center items-center w-full h-[60dvh]">
      <Loader />
    </div>
  );
}
