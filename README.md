<div align="center">

# Template Dashboard Rest API

Template modern berbasis Next.js untuk membangun Dashboard REST API yang cepat, modular, dan mudah dikembangkan. Didesain dengan arsitektur plugin-friendly agar fleksibel digunakan untuk berbagai kebutuhan backend maupun integrasi bot.

---

<p align="center">
  <img src="https://img.shields.io/badge/Template_Version-v0.1.0-purple?logo=github" alt="Version"/>
  <img src="https://img.shields.io/badge/Next.js-15%2B-green?logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/Tailwind-CSS-blue?logo=tailwind-css" alt="Tailwind-CSS"/>
  <img src="https://img.shields.io/badge/Database-Firebase-yellow?logo=firebase" alt="Firebase"/>
  <img src="https://img.shields.io/badge/License-MIT-red" alt="License"/>
</p>

</div>

---

## ⚡ Fitur Dasar
- 🧩 Endpoint modular — Tambah atau ubah route cukup dengan membuat file di folder "api/".
- 📊 Dashboard UI — Tampilan modern (Next.js + Tailwind) untuk memantau data REST API secara real-time.
- 🚀 Performa tinggi — Optimasi handler & middleware untuk respon cepat. 

---

## 🛠️ Instalasi

#### 1. Clone repository
```
git clone https://github.com/irukaindiedevs/Template-Dashboard-Rest-API.git
cd Template-Dashboard-Rest-API
```

#### 2. Install dependency
```
npm install
```
#### 3. Setup
> src/data/settings.json
```
{
  "name": "IrukaDevs",
  "version": "v0.1.0",
  "description": "Simple and easy to use API for WhatsApp Bot feature.",
  "header": {
    "status": "Active!"
  },
  "messages": {
    "success": "success",
    "error": "error",
    "failed": "failed"
  },
  "apiSettings": {
    "creator": "IrukaDevsIndie",
    "apiKey": ["irukaDep"]
  }
}
```
> buat database di Firebase
> rules RTDB firebase
```
{
  "rules": {
    ".read": true,
    ".write": false,

    "recentRequests": {
      ".read": true,
      ".write": true,
      ".indexOn": ["id"]
    },

    "stats": {
      ".read": true,
      ".write": true
    }
  }
}
```
> buat .enc.local di root project
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDxxxxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-app-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-app
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

#### 4. Run Rest API
> Run localhost
```
npm run dev
```
> Run vercel
```
1. Buka https://vercel.com dan login (gunakan akun GitHub).
2. Klik tombol “Add New → Project”.
3. Pilih repository project kamu (my-dashboard-api).
4. Vercel otomatis mendeteksi framework Next.js.
5. Tambahkan konfigurasi firebase di menu Settings → Environment Variables. Contoh:
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDxxxxxx
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
6. Klik Deploy 🚀
```

## 🖼 Preview
  <img src="https://qu.ax/UeFMh.png" alt="Preview"/>

## 👨‍💻 Sosial Media Kreator
<p align="center">
  <a href="https://github.com/irukadevsindie">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"/>
  </a>
  <a href="https://t.me/irukaid">
    <img src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white"/>
  </a>
  <a href="https://instagram.com/irukadevs.id">
    <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white"/>
  </a>
</p>
