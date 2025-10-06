import axios from "axios";
import { logRequest } from "@/lib/logRequest";
import settings from "@/data/settings.json";

export default async function handler(req, res) {
  const start = Date.now();

  try {
    const { url } = req.query;
    if (
      !/^https?:\/\/(www\.)?(tiktok\.com|vt\.tiktok\.com|vm\.tiktok\.com|m\.tiktok\.com)\/.+/i.test(
        url
      )
    )
      throw new Error("Invalid url");

    const { data } = await axios.get("https://tiktok-scraper7.p.rapidapi.com", {
      headers: {
        "X-RapidAPI-Host": "tiktok-scraper7.p.rapidapi.com",
        "X-RapidAPI-Key": "ca5c6d6fa3mshfcd2b0a0feac6b7p140e57jsn72684628152a",
      },
      params: { url, hd: "1" },
    });

    const responseTime = Date.now() - start;
    logRequest(req, 200, responseTime);
    return res.json(data.data);
  } catch (e) {
    const responseTime = Date.now() - start;
    logRequest(req, 500, responseTime);
    return res.status(500).json({ error: e.message });
  }
}
