/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['pg', 'pg-native', '@prisma/adapter-pg'],
}

module.exports = nextConfig
