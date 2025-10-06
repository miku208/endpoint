import axios from "axios";
import { logRequest } from "@/lib/logRequest";
import settings from "@/data/settings.json";

export default async function handler(req, res) {
  const start = Date.now();

  try {
    const { q } = req.query;
    if (!q) {
      const responseTime = Date.now() - start;
      logRequest(req, 400, responseTime);
      return res.status(400).json({ error: "Query parameter 'q' is required" });
    }

    const { data } = await axios("https://tikwm.com/api/feed/search", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        cookie: "current_language=en",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
      },
      data: {
        keywords: q,
        count: 12,
        cursor: 0,
        web: 1,
        hd: 1,
      },
    });

    const responseTime = Date.now() - start;
    logRequest(req, 200, responseTime);
    return res.status(200).json({
      status: 200,
      creator: settings.apiSettings.creator,
      results: data.data,
    });
  } catch (error) {
    const responseTime = Date.now() - start;
    logRequest(req, 500, responseTime);
    return res.status(500).json({
      status: 500,
      error: error.message || "Internal Server Error",
    });
  }
}
