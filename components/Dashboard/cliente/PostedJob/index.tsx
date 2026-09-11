"use client";
import { Context } from "@/components/Common/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import useApiCaller from "@/hooks/useApiCaller";
import { useContext, useEffect, useState } from "react";
import PostJOB from "./components/PostJob";

export interface TableTestDataType {
  id: string;
  job_title: string;
  listingID: string;
  date_of_post: string;
}

export default function Index() {
  const { toggleSideBar } = useContext(Context);
  const [tabelData, setTableData] = useState<TableTestDataType[]>([]);
  const { userData } = useAuth();
  const apiCaller = useApiCaller();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let userId = userData[0]?._id;
        // Check for admin impersonation
        if (typeof window !== "undefined") {
          const adminReqId = localStorage.getItem("userId_for_admin_req");
          if (adminReqId) {
            userId = adminReqId;
          }
        }

        if (!userId) return;

        const response = await apiCaller.get(`/jobpost?userId=${userId}&pageSize=100&pageNumber=1`);

        if (response.data && response.data.data) {
          const mappedData: TableTestDataType[] = response.data.data.map(
            (job: any) => ({
              id: job._id,
              job_title:
                job.serviceTitle?.service_title ||
                job.serviceTitle?.other_title ||
                "Unbenannter Job",
              listingID: job.listingId?.toString() || "N/A",
              date_of_post: new Date(job.createdAt).toLocaleDateString("de-DE"),
            })
          );
          setTableData(mappedData);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [userData, apiCaller]);

  return (
    <div className={`w-full  my-12`}>
      <PostJOB tabelData={tabelData} setTableData={setTableData} />
    </div>
  );
}
