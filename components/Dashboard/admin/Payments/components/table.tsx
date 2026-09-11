// components/PaymentTable.tsx
import React from "react";
import { Eye, Download } from "lucide-react";

interface PaymentItem {
	paymentDate: string;
	paymentPlan: string;
	paymentThru: string;
	paymentAmount: string;
	id: number;
}

interface PaymentTableProps {
	data: PaymentItem[];
}

const PaymentTable: React.FC<PaymentTableProps> = ({ data }) => {
	return (
		<div className="w-full overflow-x-auto">
			<table className="w-full table-auto">
				<thead>
					<tr className="border-b-2 border-orange-500">
						<th className="py-4 px-2 text-orange text-start font-bold">ID</th>
						<th className="py-4 px-2 text-orange text-start font-bold">Zahlungsdatum</th>
						<th className="py-4 px-2 text-orange text-start font-bold">Zahlungsplan</th>
						<th className="py-4 px-2 text-orange text-start font-bold">Gültig bis</th>
						<th className="py-4 px-2 text-orange text-start font-bold">Betrag</th>
						<th className="py-4 px-2 text-orange text-start font-bold">
							<div className="flex items-center justify-between gap-4">
								<span>Aktionen</span>
								<button className="text-white bg-orange hover:bg-orange-600 transition-colors rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-semibold shadow-sm">
									<Download className="w-3.5 h-3.5" />
									Alles laden
								</button>
							</div>
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-slate-100">
					{data.map((item, index) => (
						<tr key={index} className="hover:bg-slate-50 transition-colors">
							<td className="py-4 px-2 text-slate-600">#{item.id}</td>
							<td className="py-4 px-2 text-slate-600">{item.paymentDate}</td>
							<td className="py-4 px-2 font-medium text-slate-700">{item.paymentPlan}</td>
							<td className="py-4 px-2 text-slate-600">{item.paymentThru}</td>
							<td className="py-4 px-2 font-bold text-slate-800">€{item.paymentAmount}</td>
							<td className="py-4 px-2">
								<button className="text-orange hover:text-orange-600 font-semibold flex gap-1.5 items-center transition-colors text-sm">
									<Eye className="w-4 h-4" />
									Rechnung ansehen
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default PaymentTable;
