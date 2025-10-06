import axios from "axios";
import { logRequest } from "@/lib/logRequest";
import settings from "@/data/settings.json";

export default async function handler(req, res) {
  const start = Date.now();

  try {
    const { username } = req.query;
    if (!username) {
      const responseTime = Date.now() - start;
      logRequest(req, 400, responseTime);
      return res.status(400).json({ error: "Username wajib diisi" });
    }

    const url = `https://media.mollygram.com/?url=${encodeURIComponent(
      username
    )}`;

    const headers = {
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
      origin: "https://mollygram.com",
      referer: "https://mollygram.com/",
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
    };

    const { data } = await axios.get(url, { headers });

    if (data.status !== "ok") {
      const responseTime = Date.now() - start;
      logRequest(req, 500, responseTime);
      return res.status(500).json({ error: "Gagal mengambil data" });
    }

    const html = data.html;

    const getMatch = (regex) => {
      const match = html.match(regex);
      return match ? match[1].trim() : null;
    };

    const profilePic =
      getMatch(
        /<img[^>]*class="[^"]*rounded-circle[^"]*"[^>]*src="([^"]+)"/i
      ) ||
      getMatch(/<img[^>]*src="([^"]+)"[^>]*class="[^"]*rounded-circle[^"]*"/i);

    const uname = getMatch(/<h4 class="mb-0">([^<]+)<\/h4>/);
    const fullname = getMatch(/<p class="text-muted">([^<]+)<\/p>/);
    const bio = getMatch(/<p class="text-dark"[^>]*>([^<]+)<\/p>/);
    const posts = getMatch(
      /<div[^>]*>\s*<span class="d-block h5 mb-0">([^<]+)<\/span>\s*<div[^>]*>posts<\/div>/i
    );
    const followers = getMatch(
      /<div[^>]*>\s*<span class="d-block h5 mb-0">([^<]+)<\/span>\s*<div[^>]*>followers<\/div>/i
    );
    const following = getMatch(
      /<div[^>]*>\s*<span class="d-block h5 mb-0">([^<]+)<\/span>\s*<div[^>]*>following<\/div>/i
    );

    const responseTime = Date.now() - start;
    logRequest(req, 200, responseTime);
    return res.status(200).json({
      status: 200,
      creator: settings.apiSettings.creator,
      result: {
        username: uname,
        fullname,
        bio,
        profilePic,
        posts,
        followers,
        following,
      },
    });
  } catch (error) {
    console.error("error:", error.message);
    const responseTime = Date.now() - start;
    logRequest(req, 500, responseTime);
    return res.status(500).json({ error: error.message });
  }
}
