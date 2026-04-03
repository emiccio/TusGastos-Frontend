/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 15: fetch es no-store por defecto, más predecible
  // Para cachear rutas específicas: export const revalidate = 60
};

module.exports = nextConfig;
