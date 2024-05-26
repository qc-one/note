import { defineConfig } from 'vite'

export default defineConfig({
    //     optimizeDeps: {
    //         // exclude: ['lodash-es'], // 当遇到lodash-es时，不进行tree shaking预构建，将指定数组中的依赖不进行依赖预构建
    //     },
    envPrefix: 'ENV_'
})