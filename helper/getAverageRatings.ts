export default function getAverageRating(reviews: any): number {
	if (reviews?.length === 0) return 0;

	const totalRating = reviews?.reduce(
		(acc: number, review: any) => (acc + review?.rating) as number,
		0
	);
	const averageRating = totalRating / reviews?.length;

	// Round the average rating to two decimal places
	return Math.round(averageRating * 100) / 100;
}
