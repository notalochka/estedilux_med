/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['uk', 'en'],
    defaultLocale: 'uk',
    localeDetection: true,
  },
}

module.exports = nextConfig

