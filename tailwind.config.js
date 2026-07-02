/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "surface": "#faf8ff",
        "on-surface": "#131b2e",
        "primary-fixed-dim": "#c0c1ff",
        "surface-container-low": "#f2f3ff",
        "surface-container-lowest": "#ffffff",
        "surface-container": "#eaedff",
        "on-primary-fixed-variant": "#2f2ebe",
        "surface-container-high": "#e2e7ff",
        "outline-variant": "#c7c4d7",
        "on-secondary-container": "#fefcff",
        "on-primary": "#ffffff",
        "surface-bright": "#faf8ff",
        "on-error-container": "#93000a",
        "primary-container": "#6063ee",
        "inverse-on-surface": "#eef0ff",
        "on-surface-variant": "#464554",
        "on-tertiary-fixed": "#2c0051",
        "tertiary-fixed-dim": "#ddb7ff",
        "on-tertiary-fixed-variant": "#6900b3",
        "on-secondary-fixed": "#001a42",
        "error": "#ba1a1a",
        "surface-dim": "#d2d9f4",
        "surface-tint": "#494bd6",
        "primary": "#4648d4",
        "secondary-fixed-dim": "#adc6ff",
        "on-secondary-fixed-variant": "#004395",
        "surface-container-highest": "#dae2fd",
        "tertiary-fixed": "#f0dbff",
        "secondary-container": "#2170e4",
        "background": "#faf8ff",
        "inverse-surface": "#283044",
        "on-tertiary-container": "#fffbff",
        "tertiary": "#8127cf",
        "on-secondary": "#ffffff",
        "secondary-fixed": "#d8e2ff",
        "on-tertiary": "#ffffff",
        "on-background": "#131b2e",
        "secondary": "#0058be",
        "outline": "#767586",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-primary-fixed": "#07006c",
        "primary-fixed": "#e1e0ff",
        "inverse-primary": "#c0c1ff",
        "on-primary-container": "#fffbff",
        "surface-variant": "#dae2fd",
        "tertiary-container": "#9c48ea",
        "dark-surface": "#18181B", //bg
        "dark-surface-card": "#242427",
        "dark-on-surface": "#e8e8f0",
        "dark-on-surface-variant": "#FAFAFA"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "margin-desktop": "80px",
        "grid-unit": "40px",
        "gutter": "24px",
        "section-gap": "120px",
        "margin-mobile": "20px"
      },
      fontFamily: {
        "plus-jakarta": ["'Plus Jakarta Sans'", "sans-serif"],
        "inter": ["Inter", "sans-serif"],
        "geist-mono": ["'Geist Mono'", "monospace"]
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s infinite ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
