import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const apiDir = path.join(process.cwd(), "src/pages/api");
    const endpoints = [];

    function walk(dir, baseCategory = "") {
      fs.readdirSync(dir).forEach((file) => {
        const full = path.join(dir, file);
        const relative = path.relative(apiDir, full).replace(/\\/g, "/");

        if (fs.statSync(full).isDirectory()) {
          walk(full, path.basename(full)); // recursive untuk subfolder
        } else if (file.endsWith(".js")) {
          const category = baseCategory || "root";
          const route = `/api/${relative.replace(/\.js$/, "")}`;
          endpoints.push({
            id: route,
            path: route,
            category,
            method: "GET", // default, nanti bisa baca dari meta atau isi file kalau mau
            status: "active",
            description: "No description",
          });
        }
      });
    }

    walk(apiDir);

    res.status(200).json({
      count: endpoints.length,
      endpoints,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
