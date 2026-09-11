"use client";
import useJobpostRequests from "@/ApiRequests/jobpost";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import useScrollFetch from "@/hooks/useScrollFetchs";
import Link from "next/link";
import { useState } from "react";
import CraftsmanPortalModal from "./CraftmanPortalModal";
import { JOB } from "./NewJob/Job";

export default function NewJobs() {
	const { GetPublicJobs } = useJobpostRequests();
	const { data, isFetching, hasNextPage, fetchNextPage } = GetPublicJobs({
		pageSize: 20,
	});
	useScrollFetch({
		fetchNextPage,
		hasNextPage,
		isWindowScroll: true,
	});
	const { userData } = useAuth();
	const user = userData[0];
	const [isOpen, setIsOpen] = useState(false);
	if (isFetching) return <Loader />;
	return (
		<div className="mt-11">
			{data?.pages[0]?.data?.slice(0, 3).map((job: any) => (
				<JOB key={job._id} jobs={job} />
			))}

			<div className="mt-5 flex justify-center items-center mx-auto">
				<Link
					href={user ? "/dashboard/handwerker/" : "/"}
					title="See more Jobs">
					<button
						type="button"
						onClick={() => !user && setIsOpen(true)}
						className="bg-orange sm:px-6 sm:py-3 px-3 py-2 text-white rounded-lg sm:text-lg text-sm"
						aria-label="See more Jobs">
						Mehr Aufträge anzeigen
					</button>
				</Link>
			</div>
			<CraftsmanPortalModal isOpen={isOpen} setModalIsOpen={setIsOpen} />
		</div>
	);
}
