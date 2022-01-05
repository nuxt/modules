import { UnocssNuxtOptions } from '@unocss/nuxt'
import presetUno, { theme } from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'
import presetIcons from '@unocss/preset-icons'

export default <UnocssNuxtOptions>{
  include: [/\.vue$/, /\.ts$/, /\.vue\?vue/],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        display: 'inline-block'
      }
    })
  ],
  theme: {
    colors: {
      primary: {
        50: '#F2FDF9',
        100: '#E6FCF3',
        200: '#BFF6E0',
        300: '#99F1CD',
        400: '#4DE7A8',
        DEFAULT: '#00DC82',
        600: '#00C675',
        700: '#00844E',
        800: '#00633B',
        900: '#004227'
      },
      secondary: {
        DEFAULT: '#497A87',
        surface: '#E5F9FF',
        lightest: '#B7E1ED',
        lighter: '#95CDDE',
        light: '#71A2B0',
        dark: '#255461',
        darker: '#003543',
        darkest: '#022a35',
        black: '#001E26'
      },
      green: {
        // 50: "#eefdf2",
        50: '#d0fcde',
        100: '#b0fccb',
        200: '#8cfab7',
        300: '#64f4a3',
        400: '#37e990',
        500: '#00d77d',
        600: '#00bb6a',
        700: '#009956',
        800: '#047342',
        900: '#134d2e'
        // 950: "#132a1c",
      },
      ringWidth: {
        3: '3px'
      },
      inset: {
        13: '13px'
      },
      'line-height': {
        14: '0.875rem'
      },
      sky: {
        surface: '#E5F9FF',
        lightest: '#B7E1ED',
        lighter: '#95CDDE',
        light: '#71A2B0',
        DEFAULT: '#497A87',
        dark: '#255461',
        darker: '#003543',
        darkest: '#012A35',
        black: '#001E26'
      }
    },
    fontFamily: {
      sans: '"DM Sans",' + theme.fontFamily.sans,
      serif: '"DM Serif Display",' + theme.fontFamily.serif,
      mono: '"DM Mono",' + theme.fontFamily.mono
    },
    transitionProperty: {
      height: 'height'
    }
  },
  shortcuts: {
    'nuxt-border': 'border-gray-200 dark:border-secondary-darker',
    'nuxt-card-border': 'border border-gray-200 dark:border-secondary-darker hover:border-primary-800 focus:border-primary-800 dark:hover:border-secondary dark:focus:border-secondary focus:outline-none',
    'nuxt-card-bg': 'bg-white dark:bg-secondary-darkest',
    'nuxt-text-default': 'text-sky-darkest dark:text-white',

    'nuxt-text-highlight': 'py-2 px-4 rounded-md bg-gray-100 dark:bg-white dark:bg-opacity-10 hover:bg-gray-200',
    'nuxt-text-highlight-hover': 'nuxt-text-highlight dark:hover:bg-opacity-9 light:hover:bg-gray-50'
  },
  rules: Object.entries({
    'text-display-6': {
      'font-size': '1.875rem',
      'line-height': '2.25rem'
    },
    'text-display-5': {
      'font-size': '2.25rem',
      'line-height': '2.5rem'
    },
    'text-display-4': {
      'font-size': '3rem',
      'line-height': '3rem'
    },
    'text-display-3': {
      'font-size': '3.75rem',
      'line-height': '3.75rem'
    },
    'text-display-2': {
      'font-size': '4.5rem',
      'line-height': '4.5rem'
    },
    'text-display-1': {
      'font-size': '6rem',
      'line-height': '6rem'
    },
    'text-body-xs': {
      'font-size': '0.75rem',
      'line-height': '1rem'
    },
    'text-body-sm': {
      'font-size': '0.875rem',
      'line-height': '1.25rem'
    },
    'text-body-base': {
      'font-size': '1rem',
      'line-height': '1.5rem'
    },
    'text-body-lg': {
      'font-size': '1.125rem',
      'line-height': '1.75rem'
    },
    'text-body-xl': {
      'font-size': '1.25rem',
      'line-height': '1.75rem'
    },
    'text-body-2xl': {
      'font-size': '1.5rem',
      'line-height': '2rem'
    }
  })
}
