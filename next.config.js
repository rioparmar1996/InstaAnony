/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
};
module.exports = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "https://api.example.com/:path*",
			},
		];
	},
};

module.exports = nextConfig;
