/** @type {import('next').NextConfig} */
const port = 5431;

const nextConfig = {
  async rewrites() {
    return [
      {
        //rewrites all API requests to your Express server
        source: `/api/:path*`, // Matches all requests starting with /api/
        destination: `http://localhost:${port}/:path*`, // Redirects them to the Express server
      },
    ];
  },
};

export default nextConfig;
