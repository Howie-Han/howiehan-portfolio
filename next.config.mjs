/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. 关闭图片优化，防止 Vercel 处理图片导致内存飙升
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
    ],
  },
  // 2. 忽略所有的语法和类型检查
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // 3. 彻底关闭 SourceMaps
  productionBrowserSourceMaps: false,
  // 4. 【核心重药】干预 Webpack 行为，防止它去解析巨型的 3D 模型
  webpack: (config, { isServer }) => {
    // 阻止 webpack 处理 .glb / .mp4 文件，直接放行
    config.module.rules.push({
      test: /\.(glb|mp4|webm)$/,
      type: 'asset/resource',
    });
    // 强制关闭在服务端的 3D 渲染缓存，防止内存泄漏
    if (isServer) {
      config.externals.push('three', '@react-three/fiber', '@react-three/drei');
    }
    return config;
  },
  // 5. 【核心重药】禁用极度耗费内存的 SWC 极致压缩
  swcMinify: false,
  // 6. 减少并发构建的页面数（拉长打包时间，但极大地降低内存峰值）
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};

export default nextConfig;