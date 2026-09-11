import useReviewsRequests from "@/ApiRequests/reviews";
import Loader from "@/components/Loader";
import { format } from "date-fns";

const TrackReclaim = ({ reclaimId }: { reclaimId: string }) => {
  const { GetReclaimById } = useReviewsRequests();
  const { data, isLoading } = GetReclaimById(reclaimId);
  console.log(data);

  return (
    <div className="max-h-[100px] w-[200px] flex items-center justify-center">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h1 className="font-bold mb-2 text-lg">Beschwerde verfolgen</h1>
          <p>Status: {data?.decision?.type}</p>
          <p>Grund: {data?.reason}</p>
          <p>Reklamation erstellt am: {format(new Date(data?.createdAt || Date.now()), "MM/dd/yyyy")}</p>
        </div>
      )}
    </div>
  );
};

export default TrackReclaim;

