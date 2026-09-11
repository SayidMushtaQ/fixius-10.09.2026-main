export default function Loader() {
	return (
		<div className="flex justify-center items-center w-full h-[60dvh]">
			<div className="flex flex-col items-center gap-3">
				<div className="relative h-10 w-10">
					{[...Array(8)].map((_, i) => (
						<span
							key={i}
							className="absolute left-1/2 top-0 h-3 w-[3px] -translate-x-1/2 rounded-full bg-primary"
							style={{
								transform: `rotate(${i * 45}deg) translateY(0)`,
								transformOrigin: "center 20px",
								opacity: 1 - i * 0.1,
								animation: `fade-spinner 0.8s linear ${i * 0.1}s infinite`,
							}}
						/>
					))}
				</div>
				<style>{`
					@keyframes fade-spinner {
						0%, 100% { opacity: 1; }
						50% { opacity: 0.2; }
					}
				`}</style>
			</div>
		</div>
	);
}
