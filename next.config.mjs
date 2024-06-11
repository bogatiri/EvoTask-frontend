/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		SERVER_URL: process.env.SERVER_URL,
		CLIENT_DOMAIN: process.env.CLIENT_DOMAIN
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com'
			}
		]
	}
}

export default nextConfig
