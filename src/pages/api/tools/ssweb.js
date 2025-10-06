import axios from "axios";
import { logRequest } from "@/lib/logRequest";
import settings from "@/data/settings.json";

export default async function handler(req, res) {
  const start = Date.now();

  if (req.method !== "GET") {
    const responseTime = Date.now() - start;
    logRequest(req, 405, responseTime);
    return res.status(405).json({ error: "Method not allowed, gunakan GET" });
  }

  try {
    const {
      url,
      width = 1280,
      height = 720,
      full_page = false,
      device_scale = 1,
    } = req.query;

    if (!url || !url.startsWith("https://")) {
      const responseTime = Date.now() - start;
      logRequest(req, 400, responseTime);
      return res.status(400).json({ error: "Invalid url" });
    }

    if (isNaN(width) || isNaN(height) || isNaN(device_scale)) {
      const responseTime = Date.now() - start;
      logRequest(req, 400, responseTime);
      return res
        .status(400)
        .json({ error: "Width, height, and scale must be a number" });
    }

    if (full_page !== "true" && full_page !== "false") {
      const responseTime = Date.now() - start;
      logRequest(req, 400, responseTime);
      return res
        .status(400)
        .json({ error: "Full page must be a boolean (true/false)" });
    }

    const { data } = await axios.post(
      "https://gcp.imagy.app/screenshot/createscreenshot",
      {
        url: url,
        browserWidth: parseInt(width),
        browserHeight: parseInt(height),
        fullPage: full_page === "true",
        deviceScaleFactor: parseInt(device_scale),
        format: "png",
      },
      {
        headers: {
          "content-type": "application/json",
          referer: "https://imagy.app/full-page-screenshot-taker/",
          "user-agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36",
        },
      }
    );

    const responseTime = Date.now() - start;
    logRequest(req, 200, responseTime);
    return res.status(200).json({
      status: 200,
      creator: settings.apiSettings.creator,
      result: {
        url: data.fileUrl,
      },
    });
  } catch (error) {
    const responseTime = Date.now() - start;
    logRequest(req, 500, responseTime);
    return res.status(500).json({ error: error.message });
  }
}
