/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	fontFamily: {
  		sans: [
  			'var(--font-montserrat)',
                ...defaultTheme.fontFamily.sans
            ],
  		serif: [
  			'var(--font-reckless)',
                ...defaultTheme.fontFamily.serif
            ]
  	},
  	extend: {
  		screens: {
  			sm: '641px',
  			md: '769px',
  			lg: '1025px',
  			xl: '1281px',
  			'2xl': '1537px',
  			'3xl': '1921px'
  		},
  		colors: {
  			darker: '#362009',
  			dark: '#222222',
  			light: '#E0B385',
  			lighter: '#F5E0CC',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
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
  		spacing: {
  			'col-outer': '6vw',
  			'col-inner': '12vw'
  		},
  		keyframes: {
  			nav: {
  				from: {
  					'clip-path': 'inset(0 0 100% 0)'
  				},
  				to: {
  					'clip-path': 'inset(0 0 0 0)'
  				}
  			}
  		},
  		animation: {
  			'nav-show': 'nav 1000ms cubic-bezier(0.4, 0, 0.2, 1)',
  			'nav-hide': 'nav 1000ms cubic-bezier(0.4, 0, 0.2, 1) 1 reverse'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    require("tailwind-hamburgers"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
      require("tailwindcss-animate")
],
}
