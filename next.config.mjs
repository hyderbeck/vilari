/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.files.mow1.cloud.servers.ru",
        port: "8080",
      },
    ],
  },
};

export default nextConfig;
