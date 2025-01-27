module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background-color)',
        text: 'var(--text-color)',
        card: 'var(--card-color)',
          // scrollbar: {
          //   thumb: '#4b5563',
          //   'thumb-hover': '#374151',
          //   track: '#f3f4f6',
          // },
      },
      typography: {
        DEFAULT: {
          css: {
            h1: { color: '#1d4ed8' },
            h2: { color: '#2563eb' },
            h3: { color: '#3b82f6' },
            code: { color: '#ef4444', backgroundColor: '#f9fafb', padding: '0.2rem', borderRadius: '0.25rem' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'),
  ],
};
