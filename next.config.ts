
import type { NextConfig } from 'next';
import { withContentlayer } from 'next-contentlayer2';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      resolveExtensions: [
        '.mdx',
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.mjs',
        '.json',
      ],
    }
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'images.unsplash.com',
      port: '',
      pathname: '/**'
    }, {
      protocol: 'https',
      hostname: '88ps8qpvu9.ufs.sh',
      port: '',
      pathname: '/**'
    }, {
      protocol: 'https',
      hostname: 'github.com',
      port: '',
      pathname: '/**'
    },
    {
      protocol: 'https',
      hostname: 'utfs.io',
      port: '',
      pathname: '/**'
    }]
  },
  transpilePackages:['mdx-bundler', 'mdx-bundler/client'],
};
export default withContentlayer(nextConfig);

