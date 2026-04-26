/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      colors: {
        income: '#2d8a5e',
        expense: '#c04040',
        'income-bg': '#e4f5ec',
        'expense-bg': '#fceaea',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
