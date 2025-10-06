import axios from "axios";
import { logRequest } from "@/lib/logRequest";
import settings from "@/data/settings.json";

export default async function handler(req, res) {
  const start = Date.now();

  try {
    const { url } = req.query;
    if (!url || !url.includes("https://")) throw new Error("Url is required");

    const { data } = await axios.post(
      "https://auto-download-all-in-one.p.rapidapi.com/v1/social/autolink",
      { url },
      {
        headers: {
          "accept-encoding": "gzip",
          "cache-control": "no-cache",
          "content-type": "application/json; charset=utf-8",
          referer: "https://auto-download-all-in-one.p.rapidapi.com/",
          "user-agent": "Mozilla/5.0",
          "x-rapidapi-host": "auto-download-all-in-one.p.rapidapi.com",
          "x-rapidapi-key":
            "1dda0d29d3mshc5f2aacec619c44p16f219jsn99a62a516f98",
        },
      }
    );

    const responseTime = Date.now() - start;
    logRequest(req, 200, responseTime);
    return res.json(data);
  } catch (e) {
    const responseTime = Date.now() - start;
    logRequest(req, 500, responseTime);
    return res.status(500).json({ error: e.message });
  }
}
