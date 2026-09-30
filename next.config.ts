import type { NextConfig } from "next";

const isNetlifyDomain = process.env.URL?.includes("netlify.app");

const nextConfig: NextConfig = {
	output: 'standalone',
	
	turbopack: {
		root: __dirname,
	},

	allowedDevOrigins: ['192.168.0.193'],
	
	basePath: process.env.BASEPATH_PREFIX === "/" ? "" : process.env.BASEPATH_PREFIX,
	
	assetPrefix: process.env.ASSET_PREFIX === "/" ? "" : process.env.ASSET_PREFIX,

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.panchshil.com',
				port: '',
				pathname: '/**'
			}
		]
	},

	async headers() {
	const headers = [];
		
	if (isNetlifyDomain) {
		headers.push({
			source: "/(.*)",
			headers: [
				{
					key: "X-Robots-Tag",
					value: "noindex, nofollow"
				},
			],
		});
	}

	return headers;
	},
}

export default nextConfig;
