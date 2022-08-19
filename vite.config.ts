import type { UserConfig, ConfigEnv } from 'vite';
import { defineConfig, loadEnv, } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { createHtmlPlugin } from 'vite-plugin-html'
import WindiCSS from 'vite-plugin-windicss'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      WindiCSS(),
      AutoImport({
        imports: ['vue', 'vue-router', '@vueuse/core'],
        dts: "src/auto-import.d.ts"
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE,
          },
        },
      })
    ],
    server: {
      host: true,
      port: Number(env.VITE_PORT),
      open: true
    },
    resolve: {
      alias: [
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        // {
        //   find: /\/#\//,
        //   replacement: pathResolve('types') + '/',
        // },
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'primary-color': '#1890FF',
          },
          javascriptEnabled: true,
        },
      }
    }
  }
})
