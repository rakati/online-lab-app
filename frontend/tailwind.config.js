module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background-color)',
        text: 'var(--text-color)',
        card: 'var(--card-color)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'),],
};
