/** @type {import('next').NextConfig} */
const port = 5431;

const nextConfig = {
  async rewrites() {
    return [
      {
        //rewrites all API requests to your Express server
        source: `/api/:path*`, // Matches all requests starting with /api/
        destination: `http://api:${port}/:path*`, // Redirects them to the Express server (comment out for local build npm run dev)
        //destination: `http://localhost:${port}/:path*`, // localhost version for local build 
      },
    ];
  },
};

export default nextConfig;
