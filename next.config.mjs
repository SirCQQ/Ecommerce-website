/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'localhost',
                protocol: 'http',
                pathname: '**',
                port: '3000',
            },
            {
                hostname: 'ecommerce-website-production-a420.up.railway.app',
                protocol: 'https',
                port: '',
                pathname: '**',
            },
        ],
    },
}

export default nextConfig
