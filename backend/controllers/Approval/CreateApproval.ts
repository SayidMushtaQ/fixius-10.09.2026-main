import Approval from "@/backend/models/Approval";

const createApproval = async ({
	approver,
	requested_user,
	approval_action,
}: any) => {
	try {
		let lastApprovalId: number | null = null;

		const getNextApprovalId = async (): Promise<number> => {
			if (lastApprovalId === null) {
				const lastApproval = await Approval.findOne()
					.sort({ approval_id: -1 })
					.limit(1);
				lastApprovalId = lastApproval
					? parseInt((lastApproval as any).approval_id.split("-")[1])
					: 0;
			}

			lastApprovalId += 1;
			return lastApprovalId;
		};

		// Generate custom approval ID
		const nextApprovalId = await getNextApprovalId();
		const approval_id = `AP-${nextApprovalId.toString().padStart(4, "0")}`;

		// Create approval
		const approval = new Approval({
			approval_action,
			requested_user,
			approver,
			approval_id,
		});
		await approval.save();
		return approval;
	} catch (error) {
		throw error;
	}
};
export default createApproval;
