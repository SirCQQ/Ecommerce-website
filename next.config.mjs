/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'localhost',
                protocol: 'http',
            },
            {
                hostname: 'ecommerce-website-production-a420.up.railway.app',
                protocol: 'https',
            },
        ],
    },
}

export default nextConfig
