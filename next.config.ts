import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      '~': path.join(__dirname, 'src')
    }
  },
  sassOptions: {
    loadPaths: [path.join(__dirname, 'src')]
  }
};

export default nextConfig;
