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
      return res.status(400).json({ error: "Username is required" });
    }

    const { data } = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          "User-Agent": "NextJS-App",
        },
      }
    );

    const responseTime = Date.now() - start;
    logRequest(req, 200, responseTime);
    return res.status(200).json({
      status: 200,
      creator: settings.apiSettings.creator,
      result: {
        username: data.login,
        nickname: data.name,
        bio: data.bio,
        id: data.id,
        nodeId: data.node_id,
        profile_pic: data.avatar_url,
        url: data.html_url,
        type: data.type,
        admin: data.site_admin,
        company: data.company,
        blog: data.blog,
        location: data.location,
        email: data.email,
        public_repo: data.public_repos,
        public_gists: data.public_gists,
        followers: data.followers,
        following: data.following,
        created_at: data.created_at,
        updated_at: data.updated_at,
      },
    });
  } catch (error) {
    const status = error.response?.status || 500;
    const responseTime = Date.now() - start;
    logRequest(req, 500, responseTime);
    return res.status(status).json({
      status: status,
      error:
        status === 404
          ? `User "${req.query.username}" tidak ditemukan di GitHub`
          : `Gagal mengambil data GitHub: ${error.message}`,
    });
  }
}
