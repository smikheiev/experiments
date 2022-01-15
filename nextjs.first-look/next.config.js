/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist/next',
  images: {
    loader: 'custom',
  },
  reactStrictMode: true,
}

module.exports = nextConfig
