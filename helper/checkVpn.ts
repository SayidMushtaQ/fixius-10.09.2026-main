import axios from "axios";

/**
 * Checks if the given IP address is a VPN or Proxy.
 * Uses ip-api.com for detection.
 * Note: This is a basic implementation using a free API. For production, consider a paid service.
 *
 * @param ip The IP address to check
 * @returns Promise<boolean> True if VPN/Proxy is detected, false otherwise.
 */
const checkVpn = async (ip: string): Promise<boolean> => {
  // Skip check for local IPs
  if (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.")
  ) {
    return false;
  }

  try {
    // Using ip-api.com free endpoint
    // Fields: proxy, hosting (often used by VPNs)
    const response = await axios.get(
      `http://ip-api.com/json/${ip}?fields=status,message,proxy,hosting`
    );

    if (response.data.status === "success") {
      // If proxy or hosting is true, we consider it a potential VPN/Proxy
      // 'hosting' is often true for data center IPs which VPNs use.
      return response.data.proxy || response.data.hosting;
    }

    return false;
  } catch (error) {
    console.error("Error checking VPN status:", error);
    // Fail open (allow access) if the API check fails to avoid blocking legitimate users on error
    return false;
  }
};

export default checkVpn;
