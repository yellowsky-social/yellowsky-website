/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.mds.yandex.net',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'img.pr0gramm.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig
