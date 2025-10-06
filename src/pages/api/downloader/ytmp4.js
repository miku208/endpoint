import { ytmp4 } from "@/lib/youtube";
import { logRequest } from "@/lib/logRequest";
import settings from "@/data/settings.json";

export default async function handler(req, res) {
  const start = Date.now();

  try {
    const { url, quality } = req.query;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const result = await ytmp4(url, quality || 360);
    const responseTime = Date.now() - start;
    logRequest(req, 200, responseTime);
    return res.status(200).json(result);
  } catch (error) {
    const responseTime = Date.now() - start;
    logRequest(req, 500, responseTime);
    return res.status(500).json({ error: error.message });
  }
}
