import { fileURLToPath, URL } from 'node:url'

import { build, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import { visualizer } from 'rollup-plugin-visualizer'
import importTOcdn, { autoComplete } from 'vite-plugin-cdn-import'
import viteCompression from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
import IconResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    visualizer({
      emitFile: false,
      filename: 'visualizer.html',
      open: true,
    }),
    viteCompression({
      verbose: true, // 是否在控制台输出压缩结果
      disable: false, // 是否禁用压缩
      threshold: 10240, // 只有大小大于该值的才会被压缩
      algorithm: 'gzip', // 使用的压缩算法,可选['gzip', 'brotliCompress', 'deflate', 'deflateRaw']
      ext: '.gz', // 压缩后文件的扩展名
    }),
    importTOcdn({
      prodUrl: 'https://unpkg.com/{name}@{version}/{path}',
      modules: [
        autoComplete('vue'),
        autoComplete('axios'),
        // {
        //   name: 'element-plus',
        //   var: 'ElementPlus', // 根据main字段来自动匹配cdn
        //   version: '2.15.6',
        //   path: 'dist/index.full.js',
        //   css: 'dist/index.css',
        //   package: 'element-plus'
        // }
      ]
    }),
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    //   dts: path.resolve(__dirname, 'auto-imports.d.ts')
    // }),
    // Components({
    //   resolvers: [
    //     ElementPlusResolver(),
    //     // 自动注册图表组件
    //     // IconResolver({
    //     //   prefix: 'i', // 默认为i，设置false则不显示前缀
    //     //   // componentPrefix: 'el-icon', // 图标前缀
    //     // })
    //   ],
    // })
    // iconify图表库
    Components({
      resolvers: [
        // ElementPlusResolver(),
        // 自动注册图表组件
        IconResolver({
          // prefix: 'i', // 默认为i，设置false则不显示前缀
          // componentPrefix: 'el-icon', // 图标前缀
          enabledCollections: ['el-icon'], // 启用图标集合
        }),
        ElementPlusResolver({ importStyle: "sass" })
      ],
      dts: path.resolve(__dirname, 'auto-imports.d.ts')
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 2.自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" as *;
        `
      }
    }
  },
  // build: {
  //   outDir: 'dist',
  //   assetsDir: 'static',
  //   minify: 'terser',
  //   terserOptions: {
  //     compress: {
  //       drop_console: true, // 剔除console
  //       drop_debugger: true, // 剔除debugger
  //     },
  //   },
  //   chunkSizeWarningLimit: 2048, // 文件大于2048kb时警告
  //   // rollupOptions: {
  //   //   output: {
  //   //     chunkFileNames: '[name]-[hash].js', // 默认chunk文件名
  //   //     entryFileNames: '[name]-[hash].js', // 默认入口文件名
  //   //     assetFileNames: '[name]-[hash].[ext]', // 默认静态资源文件名
  //   //     manualChunks(id) { // 静态资源分拆打包
  //   //       if (id.includes('node_modules')) {
  //   //         return id.toString().split('node_modules/')[1].split('/')[0].toString()
  //   //       }
  //   //     }
  //   //   },
  //   // }
  // }
})
