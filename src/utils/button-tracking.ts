/**
 * Utility function to get client IP address
 */
async function getClientIP(): Promise<string> {
  // Try multiple IP services as fallbacks
  const ipServices = [
    "https://api.ipify.org?format=json",
    "https://api64.ipify.org?format=json",
    "https://ipapi.co/json/",
  ];

  for (const service of ipServices) {
    try {
      const response = await fetch(service, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        const ip = data.ip || data.query;

        // Validate IP address format (IPv4 or IPv6)
        // IPv4: xxx.xxx.xxx.xxx or IPv6: xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx (with various valid formats)
        const ipv4Regex =
          /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        const ipv6Regex =
          /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;
        if (ip && (ipv4Regex.test(ip) || ipv6Regex.test(ip))) {
          return ip;
        }
      }
    } catch (error) {
      // Continue to next service
      continue;
    }
  }

  // If all services fail, return a placeholder IPv4 address
  // This ensures the API validation passes
  console.warn(
    "Failed to fetch client IP from all services, using placeholder",
  );
  return "0.0.0.0";
}

/**
 * Utility function to get client timezone
 */
function getTimezone(): string {
  try {
    if (typeof window === "undefined") return "UTC";
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch (error) {
    return "UTC";
  }
}

/**
 * Utility function to track button clicks and send data to the metadata API
 * @param buttonId - Unique identifier for the button
 */
export async function trackButtonClick(buttonId: string): Promise<void> {
  try {
    // Get IP address and timezone
    const ip_address = await getClientIP();
    const timezone = getTimezone();

    const payload = {
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      project_id: process.env.NEXT_PUBLIC_PROJECT_ID,
      button_id: buttonId,
      count: 1,
      ip_address,
      timezone,
    };

    // Send API request - fire and forget, don't block UI
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/metadata/metadata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      body: JSON.stringify(payload),
    }).catch((error) => {
      // Silently fail - don't interrupt user experience
      console.error("Button tracking error:", error);
    });
  } catch (error) {
    // Silently fail - don't interrupt user experience
    console.error("Button tracking error:", error);
  }
}
