import { nuxtConfig } from 'nuxt-extend'

import { join } from 'path'

// import * as config from './assets/scripts/config'
// import { sortRoutes } from '@nuxt/utils'

import _ from 'lodash'
import flatten from 'flat'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from './tailwind.config.js'

const fullConfig = resolveConfig(tailwindConfig)
const FLATTEN_CONFIG = { delimiter: '-', maxDepth: 2 }

const handleName = (className, base) => {
  const split = className.split(`${base}-`)
  const prefixedName = `${split[0] || ''}${split[1] ? prefixNegativeModifiers(base, split[1]) : base || ''}`
  return prefixedName.split('-default').join('')
}

const prefixNegativeModifiers = (base, modifier) => {
  return _.startsWith(modifier, '-') ? `-${base}-${modifier.slice(1)}` : `${base}-${modifier}`
}

const dynamicRoutes = async () => {
  const legalQuery = '*[_type=="legal"].slug.current'
  const postsQuery = '*[_type=="blogPost"].slug.current'

  let legalSlugs = null
  let postsSlugs = null

  try {
    legalSlugs = await client.fetch(legalQuery)
    postsSlugs = await client.fetch(postsQuery)

    const routesForLegal = legalSlugs.map((slug) => `/legal/${slug}`)
    const routesForPosts = postsSlugs.map((slug) => `/blog-post/${slug}`)
    const allRoutes = routesForLegal.concat(routesForPosts)

    return allRoutes
  } catch (error) {
    throw ('generate blog posts error:', error)
  }
}

export default nuxtConfig({
  name: '@app/base',
  srcDir: __dirname,


  target: 'static',
  // components: true,
  publicRuntimeConfig: {
    siteName: process.env.npm_package_name || '',
    siteDescription: process.env.npm_package_description || '',
  },
  // server: {
  //   host: '0.0.0.0',
  //   port: '3333',
  // },

  plugins: [
    // '~/plugins/filters',
    // '~/plugins/vue-formulate',

    // '~/plugins/vue-scrollactive',
  ],

  buildModules: [
    // ['@nuxtjs/svg'],
    ['@nuxtjs/html-validator'],
    ['@nuxtjs/eslint-module', { cache: false }],
    // ['@nuxtjs/stylelint-module'],
    ['@nuxtjs/tailwindcss'],
  ],
  modules: [
    'nuxt-interpolation',
    // ['nuxt-webfontloader', {
    //   custom: {
    //     families: ['Canela:n4,n5', 'GTAmerica:n4,n5,n7,i4,i5,i7'],
    //     urls:['/fonts/fonts.css']
    //   },
    // }],
    // ['vue-scrollto/nuxt', {
    //   duration: 500,
    //   easing: 'ease-in-out'
    // }],

    ['@nuxtjs/sitemap', {
      hostname: 'https://foundations.koahealth.com',
      // exclude: [...betasSlugs.form, ...betasSlugs.download, ...reportsSlugs.form].map(slug => `/${slug}`),
      trailingSlash: true,
      gzip: true,
    }],
    ['@nuxtjs/robots', process.env.DEPLOY_ENV === 'production'
      ? { UserAgent: '*', Sitemap: 'https://foundations.koahealth.com/sitemap.xml', Allow: '/', Disallow: '/clients/' }
      : { UserAgent: '*', Sitemap: 'https://foundations.stg.koahealth.com/sitemap.xml', Disallow: '/' },
    ],
    ['@nuxtjs/robots', process.env.DEPLOY_ENV === 'production'
      ? { UserAgent: '*', Allow: '/' }
      : { UserAgent: '*', Disallow: '/' },
    ],

    ['@nuxtjs/gtm', {
      // id: gtmId,
      pageTracking: true,
      pageViewEventName: 'pageView',
      autoInit: true,
      debug: false,
    }],
  ],

  // generate: {
  //   fallback: true,
  //   routes: dynamicRoutes,
  // },

  build: {
    // extend (config, ctx) {},
    postcss: {
      plugins: {
        'postcss-tailwind-apply': {}, // TODO: Remove plugin once core's `applyComplexClasses` reaches stable
        'tailwindcss': join(__dirname, 'tailwind.config.js'),
        'postcss-easing-gradients': {},
        'postcss-viewport-height-correction': {},
      },
      order: [
        'postcss-import',
        // 'postcss-tailwind-apply',
        'tailwindcss',
        'postcss-easing-gradients',
        'postcss-preset-env',
        'postcss-viewport-height-correction',
        'cssnano',
      ],
      preset: {
        // autoprefixer: {
        //   overrideBrowserslist: '>0.1%, last 3 versions, Firefox ESR, not dead, not ie <= 10',
        // },
      },
    },
  },

  storybook: {
    addons: [
      '@storybook/addon-a11y',
      // '@storybook/addon-centered',
      'storybook-mobile',
      'storybook-addon-pseudo-states',
      'storybook-dark-mode/register',
      '@etchteam/storybook-addon-status/register',
    ],
    decorators: [
      "<div class='absolute inset-0 flex justify-center items-center flex-1 w-full h-full'><story /></div>",
    ],
    parameters: {
      // statuses: { wonky: '#00f' },
      options: {
        storySort: (a, b) => (a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })),
      },
      backgrounds: {
        default: 'transparent',
        values: Object.entries(flatten(fullConfig.theme.colors, FLATTEN_CONFIG)).map(([name, value]) => ({ name: handleName(name), value })),
        grid: { disable: true },
      },
      viewport: {
        viewports: Object.fromEntries(Object.entries(fullConfig.theme.screens).map(([name, width]) => [name, { name, styles: { width, height: '100%' } }])),
      },
    },
  },
})
