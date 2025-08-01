/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'rose-gold': '#E8B4B8',
        'soft-pink': '#FFE5E5',
        'warm-pink': '#FFB6C1',
        'deep-rose': '#DC143C',
        'golden': '#FFD700',
        'soft-gold': '#FFEAA7'
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 182, 193, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 182, 193, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}
