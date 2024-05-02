---
title: Vite Optimization
author: ChocolateAceCream
date: 2023/10/12 19:00
isTop: false
categories:
 - frontend
tags:
 - CDN
 - Vite
 - Vue3
---

# Vite Optimization <Badge text="Vite" type="warning" />

### Purpose
After packing, the frontend vue3 project has a index of size 1.5M, which loaded over 30s in production. The purpose is to reduce the size of index.js and then reduce the load time of first page.


### Approach
1. load external packages from CDN using importToCDN and externalGlobals plugin in vite.config.js
2. load stylesheet from CDN in index.html, load .json file from CDN in code using fetch
3. load components on-demand.
```js

//load route async
export const auth = {
  path: '/auth', name: 'auth', redirect: '/auth/login', component: () => import('@/views/auth/index'),
}


```

the packages can be loaded from external CDN includes
- vue
- vue-route
- vue-i18n
- md-editor-v3
- element-plus
- emoji-mart-vue-fast
- dayjs

### General steps
1. install importToCDN and externalGlobals plugin
```bash
npm i rollup-plugin-external-globals
npm i vite-plugin-cdn-import
```


2. load json file using fetch. Those used to be imported with
> import data from 'emoji-mart-vue-fast/data/all.json'
```js
onMounted(async() => {
  try {
    const response = await fetch('https://unpkg.com/emoji-mart-vue-fast@15.0.0/data/all.json')
    const data = await response.json()
    state.emojiIndex = new EmojiIndex(data)
  } catch (error) {
    console.log('----fetch emoji data err--', error)
  }
})
```

3. use importToCDN and externalGlobals
```js
import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Banner from 'vite-plugin-banner'

// vite.config.js
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'


import { visualizer } from 'rollup-plugin-visualizer'
import importToCDN from 'vite-plugin-cdn-import'

import externalGlobals from 'rollup-plugin-external-globals'

function pathResolve() {
  return resolve(__dirname, './', ...arguments)
  // return resolve(__dirname, '.', ...arguments)
}

const externalGlobalsObj = {
  // vue: 'Vue',
  'vue-demi': 'VueDemi',
  // 'vue-router': 'VueRouter',
  'element-plus': 'ElementPlus',
  // 'lodash-es': 'lodash-es',
  // 'vue-i18n': 'VueI18n',
}


// https://vitejs.dev/config/
export default defineConfig((params) => {
  const { command, mode } = params
  const ENV = loadEnv(mode, process.cwd())
  const timestamp = Date.parse(new Date())

  console.info(`--- running mode: ${mode}, command: ${command}, ENV: ${JSON.stringify(ENV)} ---`)
  return {
    base: './',
    root: './', // js导入的资源路径，src
    resolve: {
      extensions: ['.json', '.js', '.ts', '.vue'],
      alias: {
        '@': pathResolve('src'),
        '/img': pathResolve('src/assets/images'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      },
    },
    server: {
      port: ENV.VITE_APP_PORT,
      host: ENV.VITE_APP_HOST,
      proxy: {
        '/backend': {
          target: ENV.VITE_APP_DEV_PROXY,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/backend/, '')
        },
        '/websocket': {
          target: ENV.VITE_WEBSOCKET_LOCAL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/websocket/, ''),
          ws: true,
          // configure: (proxy, _options) => {
          //   proxy.on('error', (err, _req, _res) => {
          //     console.log('proxy error', err)
          //   })
          //   proxy.on('proxyReq', (proxyReq, req, _res) => {
          //     console.log('Sending Request to the Target:', req.method, req.url)
          //   })
          //   proxy.on('proxyRes', (proxyRes, req, _res) => {
          //     console.log('Received Response from the Target:', proxyRes.statusCode, req.url)
          //   })
          // },
        }
      },
    },
    build: {
      minify: 'terser', // 必须启用：terserOptions配置才会有效
      terserOptions: {
        compress: {
          // 生产环境时移除console.log调试代码
          drop_console: true,
          drop_debugger: true,
        }
      },
      target: 'es2015',
      manifest: false,
      sourcemap: false,
      outDir: 'dist',
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              // moment: ['moment'],
              'lodash-es': ['lodash-es'],
              'md-editor-v3': ['md-editor-v3'],
              'dayjs': 'dayjs',
            },
          },
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `$injectedColor: orange;`
          additionalData: `
            @import "@/assets/styles/globalInjectedData.scss";
          `,
        }
      }
    },
    plugins: [
      // analyze pkg size
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),


      importToCDN.Plugin({
        modules: [
          {
            name: 'vue',
            var: 'Vue',
            path: `https://unpkg.com/vue@3.3.0/dist/vue.global.prod.js`,
          },
          {
            name: 'vue-demi',
            var: 'VueDemi',
            path: `https://unpkg.com/vue-demi@0.12.5/lib/index.iife.js`,
          },
          {
            name: 'vue-router',
            var: 'VueRouter',
            path: `https://unpkg.com/vue-router@4.1.6`,
          },
          {
            name: 'md-editor-v3',
            var: 'MdEditorV3',
            path: 'https://unpkg.com/md-editor-v3@4.0.4/lib/umd/index.js',
            css: 'https://unpkg.com/md-editor-v3@4.0.4/lib/style.css'
          },
          {
            name: 'element-plus/lib/locale/lang/en',
            var: 'ElementPlusLocaleEn',
            path: 'https://unpkg.com/element-plus@2.3.14/dist/locale/en.js'
          },
          {
            name: 'element-plus/lib/locale/lang/zh-cn',
            var: 'ElementPlusLocaleZhCn',
            path: 'https://unpkg.com/element-plus@2.3.14/dist/locale/zh-cn'
          },
          {
            name: 'element-plus',
            var: 'ElementPlus',
            path: 'https://unpkg.com/element-plus@2.3.14/dist/index.full.min.js',
            css: [
              'https://unpkg.com/element-plus@2.3.14/dist/index.css',
              'https://unpkg.com/element-plus@2.3.14/theme-chalk/',
            ],
          },
          {
            name: 'emoji-mart-vue-fast',
            var: 'EmojiMart',
            path: 'https://unpkg.com/browse/emoji-mart-vue-fast@15.0.0/dist/emoji-mart.js',
            css: 'https://unpkg.com/emoji-mart-vue-fast@15.0.0/css/emoji-mart.css'
            // path: 'https://cdn.jsdelivr.net/npm/emoji-mart-vue-fast@15.0.0/dist/emoji-mart.min.js'
          },
          {
            name: 'dayjs',
            var: 'dayjs',
            path: 'https://unpkg.com/dayjs@1.8.21/dayjs.min.js'
          },
          {
            name: 'dayjs/locale/zh-cn',
            var: 'dayjs_locale_zh_cn',
            path: 'https://unpkg.com/dayjs@1.8.21/locale/zh-cn.js'
          },
          {
            name: 'dayjs/plugin/relativeTime',
            var: 'dayjs_plugin_relativeTime',
            path: 'https://unpkg.com/dayjs@1.8.21/plugin/relativeTime.js'
          },
          {
            name: 'vue-i18n',
            var: 'VueI18n',
            path: 'https://unpkg.com/vue-i18n@9.2.2/dist/vue-i18n.global.prod.js'
          },
        ],
      }),



      AutoImport({
        resolvers: [ElementPlusResolver({
          importStyle: false,
        })],
        imports: ['vue', 'vue-router']
      }),
      {
        ...externalGlobals(externalGlobalsObj),
        enforce: 'post',
        apply: 'build',
      },
      [Banner(`
  #####                                                           #                   #####
#     # #    #  ####   ####   ####  #        ##   ##### ######   # #    ####  ###### #     # #####  ######   ##   #    #
#       #    # #    # #    # #    # #       #  #    #   #       #   #  #    # #      #       #    # #       #  #  #    #
#       ###### #    # #      #    # #      #    #   #   #####  #     # #      #####  #       #    # #####  #    # ##  ##
#       #    # #    # #      #    # #      ######   #   #      ####### #      #      #       #####  #      ###### # ## #
#     # #    # #    # #    # #    # #      #    #   #   #      #     # #    # #      #     # #   #  #      #    # #    #
 #####  #    #  ####   ####   ####  ###### #    #   #   ###### #     #  ####  ######  #####  #    # ###### #    # #    #
        \n Build on Time : ${timestamp}`)],
      vue(),
      Icons({
        compiler: 'vue3',
        customCollections: {
          icon: FileSystemIconLoader('src/assets/svgs'),
          // usage:
          //  <i-svg-vue style="font-size: 50px; fill: red;" />
          //  <i-icon-vue style="font-size: 50px; fill: red;" />
        },
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: false,
          }),
          IconsResolver({
            alias: {
              svg: 'icon',
            },
            customCollections: ['icon'],
          }),
        ],
      }),
    ]
  }
})


```

After build, this will inject link & css into index.html, such as
```html
<!DOCTYPE html>
<html lang="zh-cn">

<head>
  <base href="/">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta
    content="blog, go,gin,vite,vue3"
    name="keywords" />
  <title></title><link href="https://unpkg.com/md-editor-v3@4.0.4/lib/style.css" rel="stylesheet">
<link href="https://unpkg.com/element-plus@2.3.14/dist/index.css" rel="stylesheet">
<link href="https://unpkg.com/element-plus@2.3.14/theme-chalk/" rel="stylesheet">
<link href="https://unpkg.com/emoji-mart-vue-fast@15.0.0/css/emoji-mart.css" rel="stylesheet">
<script src="https://unpkg.com/vue@3.3.0/dist/vue.global.prod.js"></script>
<script src="https://unpkg.com/browse/vue-demi@0.12.5/lib/index.iife.js"></script>
<script src="https://unpkg.com/vue-router@4.1.6"></script>
<script src="https://unpkg.com/md-editor-v3@4.0.4/lib/umd/index.js"></script>
<script src="https://unpkg.com/element-plus@2.3.14/dist/locale/en.js"></script>
<script src="https://unpkg.com/element-plus@2.3.14/dist/locale/zh-cn"></script>
<script src="https://unpkg.com/element-plus@2.3.14/dist/index.full.min.js"></script>
<script src="https://unpkg.com/browse/emoji-mart-vue-fast@15.0.0/dist/emoji-mart.js"></script>
<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
<script src="https://unpkg.com/dayjs@1.8.21/locale/zh-cn.js"></script>
<script src="https://unpkg.com/dayjs@1.8.21/plugin/relativeTime.js"></script>
<script src="https://unpkg.com/vue-i18n@9.2.2/dist/vue-i18n.global.prod.js"></script>
  <script type="module" crossorigin src="./assets/index.36abdca4.js"></script>
  <link rel="stylesheet" href="./assets/index.f904a970.css">
</head>

<body>
  <div id="app"></div>


  <script>dayjs.extend(window.dayjs_plugin_relativeTime)</script>
  <script>dayjs.locale('zh-cn')</script>

  <!-- iconfont -->
  <link rel="stylesheet" href="https://at.alicdn.com/t/c/font_3939856_ajawbhzb61i.css">


</body>

</html>
```

***p.s.1***
This approach required to import element-plus globally from main.js.
However, with ElementPlusResolver and AutoImport set up in vite config, you can still import component like this:
>import { ElMessage } from 'element-plus'
```js
//main.js
import ElementPlus from 'element-plus'

const app = createApp(App)
dayjs.extend(relativeTime)
app.provide('dayjs', dayjs)

app.use(ElementPlus)
```

***p.s.2***
for **importToCDN**, you can import css as well like this
```json
{
  name: 'element-plus',
  var: 'ElementPlus',
  path: 'https://unpkg.com/element-plus@2.3.14/dist/index.full.min.js',
  css: [
    'https://unpkg.com/element-plus@2.3.14/dist/index.css',
    'https://unpkg.com/element-plus@2.3.14/theme-chalk/',
  ],
},
```
- name is the pkg name that you used to import from in you code
>import { createRouter, createWebHistory } from 'vue-router'
in this case, name is vue-router

- var is the global object that imported from the CDN script, usually you can check the .js file you imported to see the object the code exported. You can always retrieve that var from console using window.varName, such as **window.ElementPlus**

- path is the CDN address for the imported script. Be careful for the version number.

- css can be array or string, so the css will be imported along with the script

***ps.3 externalGlobals usage***
the reason for using externalGlobals plugin is that if a node module A depends on other node modules B, then if you use **importToCDN** to import module B from CDN instead of node_modules, then you A will missing B in build, since A doesn't know where to look up for B.
e.g. vue-demi is not directly used in the project. However, it is required by vue, Now since Vue is directly imported from CDN instead of node_modules, When Vue looking for vue-demi, it will look up the global object from window, not from node_modules. So it is necessary to externally export a vue-demi global object so that everything works out.

```js
const externalGlobalsObj = {
  'vue-demi': 'VueDemi',
  'element-plus': 'ElementPlus',
}
plugins: [
  AutoImport({
    resolvers: [ElementPlusResolver({
      importStyle: false,
    })],
    imports: ['vue', 'vue-router']
  }),
  {
    ...externalGlobals(externalGlobalsObj),
    enforce: 'post',
    apply: 'build',
  },
]
```
##### Things to notice here:
- externalGlobals need to be placed after AutoImport.
- element-plus is put here because it's used by ElementPlusResolver to load component on-demand.
- ElementPlus is the name of global var that imported from CDN script
- vue-demi also need to be imported separately from CDN.


### summary
The final package size is about 280kb, which is about 10x smaller than the initial 1.5MB one. And with async loading, the first page index.js is only 128kb, which loaded in 400ms.

But be careful when using CDN because it's not safe and sometimes CDN server also experience a downtime.
