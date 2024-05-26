// 测试vite配置

import { defineConfig } from 'vite'

export default defineConfig({
    optimizeDeps: {
        // include: ['vue', 'vue-router']
    },
    envPrefix: 'QC_', // 配置vite注入客户端环境变量校验的env前缀
})
