import type { Config } from "tailwindcss";

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',
    './public/index.html',
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--foreground)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        'background-transparent': "var(--color-background-transparent)",
        'background-transparent-post': "var(--color-background-transparent-post)",
        'secondary-transparent': "var(--color-secondary-transparent)",
        'primary-transparent': "var(--color-primary-transparent)",
        white: "var(--color-white)",
      },
      animation: {
        spin: 'spin 1s linear infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      zIndex: {
        '10000': '10000',
      },
      width: {
        'container-lg': 'var(--container-width-lg)',
        'container-md': 'var(--container-width-md)',
        'container-sm': 'var(--container-width-sm)',
        'form-width': 'var(--form-width)',
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
      },
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        'ease': 'ease',
      },
    },
  },
  plugins: [],
} satisfies Config;
