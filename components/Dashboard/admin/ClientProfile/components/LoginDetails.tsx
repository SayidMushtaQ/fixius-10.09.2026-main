import Image from "next/image";

const LoginDetails = () => {
	return (
		<section className="w-5/5 flex justify-between my-10">
			<div className="w-3/5">
				<div className="w-full overflow-x-scroll">
					<div className="w-[60rem] md:w-full">
						<h1 className="font-bold text-4xl text-Heading my-10">
							Eingang
							<span className="text-orange font-bold">
								Details
							</span>
						</h1>
						<table className="min-w-full border border-grey">
							<thead className="bg-[#FF6A1880]">
								<tr>
									<th className="p-4">IP-Adresse</th>
									<th className="p-4">Eintrittsdatum</th>
									<th className="p-4">Eintrittszeit</th>
								</tr>
							</thead>
							<tbody>
								{/* {data.map((item, index) => (
					  <tr key={index} className="mb-2 my-4">
						<td className="text-center">
						  {item.IPAddress}
						</td>
						<td className="text-center">
						  {item.RegistrationDate}
						</td>
						<td className="text-center">
						  {item.RegistrationDate}
						</td>
					  </tr>
					))} */}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div className="w-2/5 flex flex-col justify-between items-end pt-32">
				<Image
					alt=""
					width={315}
					height={181}
					src={"/Dashboard/admin/profileMangement1.svg"}
				/>
				<Image
					alt=""
					width={315}
					height={181}
					src={"/Dashboard/admin/profileManagement2.svg"}
				/>
			</div>
		</section>
	);
};
export default LoginDetails;
