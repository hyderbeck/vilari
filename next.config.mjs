/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rzpcucgkjsqqedurowkl.supabase.co",
      },
    ],
    unoptimized: true
  },
  async redirects() {
    return [
      {
        source: "/cms",
        destination: `http://192.168.1.158:4000/item?secret=${Buffer.from(
          process.env.ADMIN_SECRET
        ).toString("base64")}`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
