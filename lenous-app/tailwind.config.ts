import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'system-ui'],
        poppins: ['Poppins', 'system-ui'],
      },
      backgroundImage: {
        'primary-gradient':
          'radial-gradient(66% 96.93% at 27% 46.99%, rgba(20, 184, 166, 0.20) 10%, rgba(20, 184, 166, 0) 100%)',
        'colorfull-gradient':
          'linear-gradient(90deg, #FF0303 0%, #FF9900 19%, #14DB03 35%, #00FFC7 51%, #0094FF 68%, #8F00FF 85%, #FF00D6 100%)',
        'radial-gradient-25-5':
          'radial-gradient(100.00% 61.87% at 50% 48.84%, rgba(20, 184, 166, 0.25) 0%, rgba(20, 184, 166, 0.05) 100%)',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'green-linear-gradient':
          ' linear-gradient(90deg, rgba(20, 184, 166, 0.15) 0%, rgba(20, 184, 166, 0) 100%)',
        'tab-linear-gradient':
          ' linear-gradient(180deg, rgba(3, 255, 200, 0.05) 0%, rgba(3, 255, 200, 0.01) 50%, rgba(3, 255, 200, 0) 100%)',
      },
      borderRadius: {
        '6xl': '75px',
        '4xl': '40px',
      },
      blur: {
        '34': '34px',
      },
      colors: {
        primary: '#14B8A6',
        'primary-dark': '#0E8276',
        'teal-bg': '#3F4C49',
        'third-layer-bg': '#4F5B58',
        'body-text-dark': '#FFFFFF',
        'dark-background': '#0D050F',
        'neutral-light': '#AAAAAA',
        'good-condition': '#00D17A',
        'bad-situation': '#EE4A3D',
        'less-important': '#AAAAAA',
        'button-border': '#BCBCBC',
        'button-gradient': 'rgba(217, 217, 217, 0.15)',
        'tabs-gradient': 'rgba(217, 217, 217, 0.05)',
        'active-tabs': 'rgba(3, 255, 200, 0.05)',
        'green-border': '#03FFC8',
        'neutral-button': '#343434',
        'platform-bg-gradient': '#14B8A64D',
        'white-bg-30': 'rgba(255, 255, 255, 0.30)',
        'white-bg-05': 'rgba(255, 255, 255, 0.05)',
        'white-bg-15': 'rgba(255, 255, 255, 0.15)',
        'light-gray': '#56555A',
        'dark-gray': '#2D2B34',
        red: '#EF4444',
        yellow: '#EAB308',
        purple: '#A855F7',
      },
    },
  },
  plugins: [],
};
export default config;
