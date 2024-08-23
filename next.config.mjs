/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'localhost',
            'doggodesigns-production.up.railway.app',
            'doggo-designs.titan-shard.com',
        ]
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
            };
        }
        return config;
    },
    experimental: {
        esmExternals: 'loose',
    },
};

export default nextConfig;