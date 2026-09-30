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
  
	async redirects() {
		return [
			{
				source: "/about-the-developer",
				destination: "/",
				permanent: true,
			},
			{
				source: "/yoo",
				destination: "/",
				permanent: true,
			},
			{
				source: "/the-soaq-spa",
				destination: "/",
				permanent: true,
			},
			{
				source: "/tranquil-oasis",
				destination: "/",
				permanent: true,
			},
			{
				source: "/the-residences",
				destination: "/",
				permanent: true,
			},
			{
				source: "/show-suite",
				destination: "/",
				permanent: true,
			},
			{
				source: "/contact-us",
				destination: "/",
				permanent: true,
			},
			{
				source: "/media-coverage",
				destination: "/",
				permanent: true,
			},
			{
				source: "/amenities",
				destination: "/",
				permanent: true,
			},
			{
				source: "/spa-la-vie-loccitane",
				destination: "/",
				permanent: true,
			}
		];
	}
}

export default nextConfig;
