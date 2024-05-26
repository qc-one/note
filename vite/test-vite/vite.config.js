import { defineConfig, loadEnv, optimizeDeps } from "vite";
import viteBaseConfig from "./vite.base.config";
import viteDevConfig from "./vite.dev.config";
import viteProdConfig from "./vite.prod.config";

// export default defineConfig({
//     optimizeDeps: {
//         // exclude: ['lodash-es'], // 当遇到lodash-es时，不进行tree shaking预构建，将指定数组中的依赖不进行依赖预构建
//     },
// })

const envResolver = {
    // 开发环境
    serve: () => {
        console.log("开发环境")
        return Object.assign({}, viteBaseConfig, viteDevConfig);
    },
    // 生产环境
    build: () => {
        console.log("生产环境")
        return Object.assign({}, viteBaseConfig, viteProdConfig);
    }
}

export default defineConfig(({ command, mode }) => {
    console.log(command, 'command', mode)
    // console.log(process.env, 'process')
    // console.log(process.cwd(), 'process.cwd')
    const env = loadEnv(mode, process.cwd(), "")
    // console.log(env, 'env')
    return envResolver[command]();
})