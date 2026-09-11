import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

const getIpAddress = (req: NextApiRequest | NextRequest | Request) => {
	// Extract IP address from request headers
	let ipAddress: string | string[] | undefined | null;

	if ("headers" in req && typeof req.headers.get === "function") {
		ipAddress = req.headers.get("x-forwarded-for");
	} else {
		ipAddress =
			(req as NextApiRequest).headers["x-forwarded-for"] ||
			(req as NextApiRequest).socket?.remoteAddress;
	}

	// If IP address is IPv6, it may return '::ffff:xxx.xxx.xxx.xxx', so extract the IPv4 address
	if (typeof ipAddress === "string" && ipAddress.startsWith("::ffff:")) {
		return ipAddress.split(":").pop();
	}

	return ipAddress || "127.0.0.1";
};

export default getIpAddress;
