import Approval, { IApproval } from "@/backend/models/Approval";

const updateApproval = async (approvalObj: IApproval) => {
	try {
		// Create approval
		const approval = new Approval(approvalObj);
		await approval.save();
		return approval;
	} catch (error) {
		throw error;
	}
};
export default updateApproval;
