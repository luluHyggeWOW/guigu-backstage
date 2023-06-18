import { ConfigEnv, UserConfigExport, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
    viteMockServe({
      enable: command === 'serve',
    }),
    ],
    resolve: { alias: { '@': path.resolve('./src') } },
  }
}
