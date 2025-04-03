import type { Config } from "tailwindcss";

export default {
  darkMode: ['class'],
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
        background: 'var(--color-background)', // Use var() directly for consistency
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--color-primary)', // Use CSS variable directly
          foreground: 'var(--primary-foreground)',
          transparent: 'var(--color-primary-transparent)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          transparent: 'var(--color-secondary-transparent)',
        },
        'background-transparent': 'var(--color-background-transparent)',
        'background-transparent-post': 'var(--color-background-transparent-post)',
        white: 'var(--color-white)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          '1': 'var(--chart-1)',
          '2': 'var(--chart-2)',
          '3': 'var(--chart-3)',
          '4': 'var(--chart-4)',
          '5': 'var(--chart-5)',
        },
      },
      animation: {
        spin: 'spin 1s linear infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
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
        width: 'width',
        height: 'height',
      },
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        ease: 'ease',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;