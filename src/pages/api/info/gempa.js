import { logRequest } from "@/lib/logRequest";
import settings from "@/data/settings.json";

export default async function handler(req, res) {
  const start = Date.now();

  try {
    const response = await fetch(
      "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json"
    );
    const data = await response.json();

    if (!data || !data.Infogempa || !data.Infogempa.gempa) {
      const responseTime = Date.now() - start;
      logRequest(req, 500, responseTime);
      return res.status(500).json({
        status: 500,
        creator: settings.apiSettings.creator,
        message: "Gagal mendapatkan data gempa dari BMKG",
      });
    }

    const gempa = data.Infogempa.gempa;

    const responseTime = Date.now() - start;
    logRequest(req, 200, responseTime);
    return res.status(200).json({
      status: 200,
      creator: settings.apiSettings.creator,
      result: {
        tanggal: gempa.Tanggal,
        waktu: gempa.Jam,
        magnitudo: gempa.Magnitude,
        kedalaman: gempa.Kedalaman,
        lokasi: gempa.Wilayah,
        koordinat: `${gempa.Lintang} ${gempa.Bujur}`,
        potensi: gempa.Potensi,
        dirasakan: gempa.Dirasakan,
        shakemap: gempa.Shakemap
          ? `https://data.bmkg.go.id/DataMKG/TEWS/${gempa.Shakemap}`
          : null,
        sumber: "https://www.bmkg.go.id/",
      },
    });
  } catch (error) {
    console.error(error);
    const responseTime = Date.now() - start;
    logRequest(req, 500, responseTime);
    return res.status(500).json({
      status: 500,
      creator: settings.apiSettings.creator,
      message: "Terjadi kesalahan saat mengambil data gempa",
      error: error.message,
    });
  }
}
