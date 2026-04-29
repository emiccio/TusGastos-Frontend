/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#25D366',
          dark:    '#1DA851',
          light:   '#E8F5E9',
        },
        slate: {
          text:    '#2D3748',
          muted:   '#718096',
        },
        surface: {
          base:    '#FFFDF9',
          card:    '#F8F9FA',
        },
        data: {
          amber:   '#F59E0B',
          red:     '#EF4444',
          blue:    '#3B82F6',
        },
      },
      fontFamily: {
        heading: ['var(--font-jakarta)', 'sans-serif'],
        body:    ['var(--font-dm-sans)', 'sans-serif'],
      },
      borderRadius: {
        'card':  '16px',
        'card-md': '12px',
      },
      boxShadow: {
        'card':       '0 1px 3px 0 rgba(45, 55, 72, 0.08)',
        'card-hover': '0 4px 12px 0 rgba(45, 55, 72, 0.12)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
