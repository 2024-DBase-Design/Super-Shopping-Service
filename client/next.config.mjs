/** @type {import('next').NextConfig} */
const port = 3000;

const nextConfig = {
    async rewrites(){
        return [{ //rewrites all API requests to your Express server
            source: "/",
            destination: `http://localhost:${port}/:path`
        }]
    }
};

export default nextConfig;
