import AboutBusiness from "./components/AboutBusiness";
import Hero from "./components/Hero";
import ReviewsFromClients from "./components/ReviewsFromClients";
import Services from "./components/Services";
export default function Index({ profileData }: any) {
	return (
		<div className="pt-28 w-full">
			<Hero data={profileData} />
			<Services
				data={profileData?.services}
				count={3}
				showArrows={false}
				showIcons={false}
			/>
			<AboutBusiness data={profileData} />
			<ReviewsFromClients
				reviews={
					profileData?.reviews.length > 0
						? profileData?.reviews
						: undefined
				}
			/>
		</div>
	);
}
