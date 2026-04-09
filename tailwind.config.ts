import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Dynamic color classes used in the page
    {
      pattern: /bg-(red|orange|purple|gray|yellow|green|blue|emerald|amber)-(50|100|200|500|600|700)/,
    },
    {
      pattern: /text-(red|orange|purple|gray|yellow|green|blue|emerald|amber)-(400|500|600|700|800)/,
    },
    {
      pattern: /border-(red|orange|purple|gray|yellow|green|blue|emerald|amber)-(200|300)/,
    },
    {
      pattern: /shadow-(red|orange|purple|yellow|blue)-(100)/,
    },
    {
      pattern: /hover:bg-(red|orange|purple|gray|yellow|blue)-(100|600)/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
