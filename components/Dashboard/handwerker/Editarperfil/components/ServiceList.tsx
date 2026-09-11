import { ServiceCards } from "@/constants/landingPage";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ServiceList({
	handleRemove,
	data,
}: {
	data: string[];
	handleRemove?: any;
}) {
	const userServiceList = ServiceCards.filter((i) =>
		data.includes(i.shortText)
	);
	return (
		<section className="flex flex-wrap items-center">
			{userServiceList?.map((item, idx) => (
				<div
					className={cn(
						"w-[140px] bg-white cursor-pointer relative m-3 px-3 flex justify-center items-center text-center flex-col py-6 rounded-2xl border border-slate-200/60 shadow-sm transition-all duration-300 hover:shadow-premium hover:-translate-y-1 hover:border-primary/30"
					)}
					key={idx}>
					{handleRemove && (
						<button
							className="absolute -top-2 -right-2 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md z-20 hover:scale-110 transition-transform"
							onClick={() => {
								handleRemove(idx, "services");
							}}>
							<span className="text-white text-xs font-bold">✕</span>
						</button>
					)}
					<div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center p-2 mb-3 transition-colors group-hover:bg-primary/10">
						<Image
							src={item.icon}
							className="w-10 h-auto opacity-90"
							alt="icon"
							width={40}
							height={40}
						/>
					</div>
					<span
						className="text-xs font-bold text-slate-900 leading-tight line-clamp-2"
						title={item.shortText}>
						{item.shortText}
					</span>
				</div>
			))}
		</section>
	);
}
