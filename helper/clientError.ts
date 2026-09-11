import { toast } from "sonner";
import nodataIcon from "./sin-datos.png";
export default function () {
  return (error: any) => {
    const errorRes = error?.response?.data;
    if (errorRes) {
      toast.error(errorRes.error || errorRes.info);
    } else if (error.messag) toast.error(error.messag);
    else
      toast.error(
        typeof error === "string"
          ? error
          : error.message || "An unexpected error occurred"
      );
  };
}

export const nodataImg = nodataIcon;
