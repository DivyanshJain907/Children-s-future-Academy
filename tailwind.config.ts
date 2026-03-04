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
        primary: '#0d7a2e', // Green from reference
        secondary: '#0a5f24',
        accent: '#ff6b35', // Orange accent
        dark: '#1a1a2e',
      },
    },
  },
  plugins: [],
}
export default config
