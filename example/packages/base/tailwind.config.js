// const _ = require('lodash')
// const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

const pxToRem = (px, base = 16) => process.env.NODE_ENV === 'production' ? `${px}px` : `${px / base}rem`
const buildScaleFromArray = (I, cb) => I.reduce((a, i) => ({ ...a, [i]: cb ? cb(i) : i }), {})
const buildScaleFromSteps = (step = 4, limit = 64) => {
  const scale = { 0: '0px' }
  Array(limit / step).fill()
    .map((value, key) => pxToRem((key + 1) * step))
    .forEach((value, key) => { scale[(key + 1) * step] = value })
  return scale
}

module.exports = {
  experimental: {
    applyComplexClasses: false,
  },
  future: {
    removeDeprecatedGapUtilities: true,
  },

  theme: {
    extend: {
      screens: { xl: '1440px' },

      // spacing: {
      //   ...buildScaleFromArray([0, 0.5, 1.5, 2.5, 3.5, 7, 9, 11, 13, 14, 18, 22, 26, 28, 36], pxToRem),
      //   'screen-1/2': '50vw',
      // },
      // inset: {
      //   ...buildScaleFromArray([-36, -28, -20, -16, 1, 4, 12.5, 15], pxToRem),
      //   '1/2': '50%',
      //   'full': '100%',
      // },
      spacing: {
        '0': '0rem',
        '0.5': '0.125rem',
        '1.5': '0.375rem',
        '2.5': '0.625rem',
        '3.5': '0.875rem',
        '7': '1.75rem',
        '9': '2.25rem',
        '11': '2.75rem',
        '13': '3.25rem',
        '14': '3.5rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '28': '7rem',
        '36': '9rem',
        'screen-1/2': '50vw',
      },
      inset: {
        '-16': '-4rem',
        '-20': '-5rem',
        '-28': '-7rem',
        '-36': '-9rem',
        '1': '0.25rem',
        '4': '1rem',
        '12.5': '3.125rem',
        '15': '3.75rem',
        '1/2': '50%',
        'full': '100%',
      },

      gridRow: { 'span-full': '1 / -1' },
      gridColumn: { 'span-full': '1 / -1' },
      gridTemplateColumns: { 20: 'repeat(20, minmax(0, 1fr))' },
      gridTemplateRows: { about: 'repeat(4, 4.5rem)' },
      gridColumnStart: buildScaleFromArray(['13', '14', '15', '16', '17', '18', '19', '20']),
      gridColumnEnd: buildScaleFromArray(['13', '14', '15', '16', '17', '18', '19', '20', '21']),

      fontFamily: {
        sans: ['Surt', ...defaultTheme.fontFamily.sans],
        serif: ['Super', ...defaultTheme.fontFamily.serif],
      },

      maxHeight: buildScaleFromArray([450, 600], pxToRem),
      // minHeight: { 'screen-4/5': '80vh' },

      backgroundImage: (theme) => ({
        'dropdown': 'url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="%23302625" viewBox="0 0 12 12"%3E%3Cpath d="M6 12L3.40192 7.5.803849 3H11.1962L8.59808 7.5 6 12z"/%3E%3C/svg%3E%0A\')',
        'quote': 'url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 33 23"%3E%3Cpath fill="%23BC893F" d="M0 22.9018h11.5348l1.9694-11.0659H9.00279L15.0984.86377H9.19035L1.96936 11.8359 0 22.9018zm17.0678 0h11.5348l1.9694-11.0659h-4.5014L32.26.86377h-6.0019l-7.221 10.97213-1.9693 11.0659z"/%3E%3C/svg%3E%0A\')',
        'cross': 'url(\'data:image/svg+xml, %3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"%3E%3Cpath d="M18.3848 0l1.41421356 1.41421356-18.3847763 18.38477631-1.41421357-1.41421356z"/%3E%3Cpath d="M19.799 18.3848l-1.41421356 1.41421356L.00001013 1.41423726 1.41422369.00002368z"/%3E%3C/svg%3E\')',
        'gradient-overlay': `linear-gradient(to bottom, ${theme('colors.transparent')}, cubic-bezier(0.48, 0.3, 0.64, 1), ${theme('colors.black.DEFAULT')})`,
      }),
      backgroundSize: {
        dropdown: '0.75rem',
      },

      opacity: buildScaleFromArray([90], i => (String(i / 100))),
      zIndex: { '-10': '-10' },

      boxShadow: {
        dropdown: '0 2px 2px rgba(0, 0, 0, 0.1)',
        header: '0px 4px 12px rgba(0, 0, 0, 0.15)',
      },
      scale: {
        flip: '-1',
      },
      transitionProperty: (theme) => ({
        link: `text-decoration, ${defaultTheme.transitionProperty.colors}`,
      }),
      transitionDuration: {
        250: '250ms',
      },
    },

    colors: {
      inherit: 'inherit',
      current: 'currentColor',
      transparent: 'transparent',
      white: '#FFFFFF',
      black: {
        // TODO: Check which is the right shade. Palette uses `#A29D9D` instead
        light: '#A19D9D',
        DEFAULT: '#302625',
        dark: '#211919',
      },
      gray: {
        light: '#D9DCE3',
        DEFAULT: '#828282',
        dark: '#6C6564',
      },
      cream: {
        light: '#FEF8F4',
        hover: '#FAF2ED',
        DEFAULT: '#F7EDE8',
        dark: '#EFE0D9',
      },
      gold: {
        light: '#E7D1B1',
        DEFAULT: '#BC893F',
        dark: '#A47530',
      },
      red: {
        light: '#FEBEB3',
        DEFAULT: '#F25D44',
        dark: '#D24A33',
      },
      blue: {
        light: '#BFE4FF',
        DEFAULT: '#8DC6EE',
        dark: '#6FB0DF',
      },
    },

    fontSize: {
      unset: 'unset',
      ...buildScaleFromArray([8, 9, 10, 11, 12, 13], pxToRem),
      ...buildScaleFromArray([14, 16, 18, 20, 22], pxToRem),
      ...buildScaleFromArray([24, 28, 32, 36, 40], pxToRem),
      ...buildScaleFromArray([48, 56, 64, 72, 80, 88, 112], pxToRem),
    },
    fontWeight: buildScaleFromArray(['100', '200', '300', '400', '500', '600', '700', '800', '900']),
    lineHeight: buildScaleFromArray([105, 115, 120, 130, 140, 150], i => (String(i / 100))),
    letterSpacing: {
      tightest: '-0.03em',
      tighter: '-0.02em',
      tight: '-0.01em',
      normal: '0',
      wide: '0.01em',
      wider: '0.02em',
      widest: '0.03em',
    },

    fill: (theme) => ({ ...theme('colors'), none: 'none' }),
    stroke: (theme) => ({ ...theme('colors'), none: 'none' }),

    container: {
      center: true,
      padding: {
        DEFAULT: '1.125rem',
        md: '2.5rem',
        lg: '3.5rem',
        xl: '5.3125rem',
      },
    },
    aspectRatio: {
      'none': 0,
      '1/1': [1, 1],
      '2/1': [2, 1],
      '3/2': [3, 2],
      '8/6': [8, 6],
      '8/7': [8, 7],
      '12/5': [12, 5],
      '10/3.5': [10, 3.5],
      '10/7': [10, 7],
      '16/9': [16, 9],
    },
  },

  variants: {
    // textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    // textDecoration: ['responsive', 'hover', 'focus', 'group-hover'],
    // opacity: ['responsive', 'hover', 'focus', 'group-hover'],
  },

  corePlugins: {
    backgroundImage: false,
  },

  plugins: [
    ...process.env.NODE_ENV !== 'production'
      ? [require('tailwindcss-debug-screens')]
      : [],

    // require('tailwindcss-aspect-ratio'),
    // require('tailwindcss-background-extended')(),
    // require('tailwindcss-padding-safe')(),
  ],

  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
}
