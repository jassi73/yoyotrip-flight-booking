/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yovo: {
          red: '#D81B43',
          'red-hover': '#C01538',
          'red-dark': '#99112C',
          'red-light': '#FDF2F4',
          'red-50': '#FFF1F2',
          navy: '#0F172A',
          slate: '#1E293B',
          muted: '#64748B',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          accent: '#EC4899',
          gold: '#F59E0B',
          green: '#10B981',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'yovo-card': '0 4px 20px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        'yovo-hover': '0 12px 30px -4px rgba(216, 27, 67, 0.15), 0 4px 12px -2px rgba(15, 23, 42, 0.08)',
        'yovo-glow': '0 0 20px rgba(216, 27, 67, 0.25)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        pulseSubtle: 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
