/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // 官方防 OOM 核心机制：按需解析 3D 库，拒绝全量加载
    optimizePackageImports: ['@react-three/drei'],
  }
};

export default nextConfig;