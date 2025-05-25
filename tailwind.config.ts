import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
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
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				kare: {
					'50': '#f2f8ff',
					'100': '#e6f1ff',
					'200': '#d4e5ff',
					'300': '#b0d0ff',
					'400': '#85b3ff', 
					'500': '#5986f6',
					'600': '#3b62e0',
					'700': '#324bbb',
					'800': '#283a91',
					'900': '#253474',
					'950': '#141c54',
				},
				lavender: {
					'50': '#f8f7fe',
					'100': '#f0ecfd',
					'200': '#e3defc',
					'300': '#cec3f8',
					'400': '#b2a0f1',
					'500': '#9c81e8',
					'600': '#8c69d8',
					'700': '#7555be',
					'800': '#61479a',
					'900': '#503c7c',
					'950': '#301e4f',
				},
				teal: {
					'50': '#effbfb',
					'100': '#d7f4f5',
					'200': '#b3e8ec',
					'300': '#81d3da',
					'400': '#5ab5c2',
					'500': '#3a96a7',
					'600': '#2c7c8c',
					'700': '#266473',
					'800': '#23525e',
					'900': '#1f4550',
					'950': '#0f2c35',
				},
				warmth: {
					'50': '#fef6ee',
					'100': '#fdead7',
					'200': '#fad3ae',
					'300': '#f6b67c',
					'400': '#f19249',
					'500': '#ea6f24',
					'600': '#d94e17',
					'700': '#b33815',
					'800': '#912e19',
					'900': '#772918',
					'950': '#40130c',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'scroll': {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(calc(-50% - 1rem))' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'scroll': 'scroll 30s linear infinite'
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Playfair Display', 'serif'],
			},
			backgroundImage: {
				'gradient-logo': 'linear-gradient(90deg, #324bbb 0%, #5986f6 50%, #b3e8ec 100%)',
			},
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
