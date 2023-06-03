/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['via.placeholder.com', 'unsplash.it'],
  }, //required for - error Error: Invalid src prop (https://via.placeholder.com/600/92c952) on `next/image`, hostname "via.placeholder.com" is not configured under images in your `next.config.js`
};

module.exports = nextConfig;
