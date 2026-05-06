import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  const isDev = process.env.NEXT_PUBLIC_ENV === 'dev';
  const appName = isDev ? 'GestionAndo-DEV' : 'GestionAndo';

  return {
    name: appName,
    short_name: appName,
    description: 'Controla tus gastos de forma simple desde WhatsApp.',
    lang: 'es-AR',
    start_url: '/login?source=pwa',
    scope: '/',
    display: 'standalone',
    background_color: '#f7f4ee',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/icons/pwa-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/pwa-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/pwa-512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
