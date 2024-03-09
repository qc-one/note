import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({  
      targets: ['firefox > 40', 'chrome >= 52'],  
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],  
      renderLegacyChunks: true,  
      polyfills: [  
        'es.symbol',  
        'es.promise',  
        'es.promise.finally',  
        'es/map',  
        'es/set',  
        'es.array.filter',  
        'es.array.for-each',  
        'es.array.flat-map',  
        'es.object.define-property',  
        // ...其他需要的polyfills  
      ],  
    }), 
  ],
  base: '/admin',

})
