import { nuxtConfig } from 'nuxt-extend'

export default nuxtConfig({
  name: '@app/desktop',
  extends: '@app/base/nuxt.config',

  head: () => {
    const userAgent = process.client && window.navigator.userAgent
    const mobileSafari = userAgent && (
      (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) &&
      !(userAgent.match(/CriOS/i) || userAgent.match(/FxiOS/i))
    )

    return {
      title: process.env.npm_package_name || '',
      meta: [
        { charset: 'utf-8' },
        { hid: 'viewport', name: 'viewport', content: `width=device-width, initial-scale=1,${mobileSafari ? ' maximum-scale=1,' : ''} viewport-fit=cover` },
        { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
        { hid: 'og:site_name', property: 'og:site_name', content: process.env.npm_package_name || '' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        // { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        // { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        // { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
      ],
    }
  },
})
