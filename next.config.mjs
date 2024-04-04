/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            'localhost',
            'ecommerce-website-production-a420.up.railway.app',
        ],
    },
}

export default nextConfig
