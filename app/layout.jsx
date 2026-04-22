'use client';

import { useEffect, useState } from 'react';
import './globals.css';
import LoadingScreen from '@/components/LoadingScreen';

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="id">
      <head>
        <title>MikuHost | Futuristic Portfolio</title>
        <meta name="description" content="MikuHost - Bot Developer, API Engineer, Web Designer. Build & scale digital solutions." />
        <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body>
        {loading ? <LoadingScreen /> : children}
      </body>
    </html>
  );
}