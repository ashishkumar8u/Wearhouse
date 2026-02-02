import UAParser from "ua-parser-js";

export type UAParsed = {
  browser: { name: string; version: string };
  os: { name: string; version: string };
  device: { type: string; vendor: string; model: string };
  engine: { name: string; version: string };
};

/**
 * Parse current User-Agent and return browser, OS, device, engine.
 * Safe to call in browser only; returns empty strings on server.
 */
export function getUAParsed(): UAParsed {
  if (typeof window === "undefined") {
    return {
      browser: { name: "", version: "" },
      os: { name: "", version: "" },
      device: { type: "", vendor: "", model: "" },
      engine: { name: "", version: "" },
    };
  }

  const parser = new UAParser();
  const browser = parser.getBrowser();
  const os = parser.getOS();
  const device = parser.getDevice();
  const engine = parser.getEngine();

  // 🔹 Normalize device type
  let deviceType = "Desktop";

  if (device.type === "mobile") deviceType = "Mobile";
  else if (device.type === "tablet") deviceType = "Tablet";
  else if (device.type) deviceType = device.type; // fallback for other types

  return {
    browser: { name: browser.name || "", version: browser.version || "" },
    os: { name: os.name || "", version: os.version || "" },
    device: {
      type: deviceType,
      vendor: device.vendor || "",
      model: device.model || "",
    },
    engine: { name: engine.name || "", version: engine.version || "" },
  };
}
