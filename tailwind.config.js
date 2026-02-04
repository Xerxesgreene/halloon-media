/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FEFDFB',
          100: '#FBF9F4',
          200: '#F7F2E3',
          300: '#F0E9D8',
          400: '#E8DFC7',
          500: '#E0D5B6',
          600: '#D4C49A',
          700: '#BDAA7F',
        },
        forest: {
          50: '#E8F0ED',
          100: '#D1E1DB',
          200: '#A3C3B7',
          300: '#75A593',
          400: '#47876F',
          500: '#2D5F4D',
          600: '#1F4438',
          700: '#1A3B30',
          800: '#143227',
          900: '#0F281F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'rotate-slow': 'rotate 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
