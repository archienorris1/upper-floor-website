import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#1B8A3F',
          'green-dark': '#0F5E29',
          cream: '#F3EEE1',
          ink: '#0A0A0A',
        },
      },
      fontFamily: {
        serif: ['Ovo', 'Georgia', 'serif'],
        sans: ['"Open Sauce Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        headline: '-0.02em',
      },
    },
  },
  plugins: [],
}

export default config
