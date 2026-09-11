import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function ImageViewer({
	index,
	setIndex,
	images,
}: {
	index: number;
	setIndex: React.Dispatch<React.SetStateAction<number>>;
	images: string[];
}) {
	return (
		<>
			{/* <button type="button" onClick={() => setOpen(true)}>
				Open Lightbox
			</button> */}

			<Lightbox
				index={index}
				open={index >= 0}
				slides={images?.map((i) => ({ src: i }))}
				close={() => setIndex(-1)}
			/>
		</>
	);
}
