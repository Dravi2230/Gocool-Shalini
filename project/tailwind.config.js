/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        rose: {
          gold: '#b76e79',
        },
        blush: '#ffd9e8',
        lavender: '#e6d9ff',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
        body: ['"Quicksand"', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.9' },
          '100%': { transform: 'translateY(-110vh) rotate(360deg)', opacity: '0' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        float: 'float linear infinite',
        twinkle: 'twinkle ease-in-out infinite',
        shimmer: 'shimmer 6s ease infinite',
      },
    },
  },
  plugins: [],
}
