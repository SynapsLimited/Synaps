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
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			'background-transparent': 'var(--color-background-transparent)',
  			'background-transparent-post': 'var(--color-background-transparent-post)',
  			'secondary-transparent': 'var(--color-secondary-transparent)',
  			'primary-transparent': 'var(--color-primary-transparent)',
  			white: 'var(--color-white)',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		animation: {
  			spin: 'spin 1s linear infinite'
  		},
  		keyframes: {
  			spin: {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(360deg)'
  				}
  			}
  		},
  		zIndex: {
  			'10000': '10000'
  		},
  		width: {
  			'container-lg': 'var(--container-width-lg)',
  			'container-md': 'var(--container-width-md)',
  			'container-sm': 'var(--container-width-sm)',
  			'form-width': 'var(--form-width)'
  		},
  		transitionProperty: {
  			width: 'width',
  			height: 'height'
  		},
  		transitionDuration: {
  			'400': '400ms'
  		},
  		transitionTimingFunction: {
  			ease: 'ease'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
