/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0A0E14',
          raised: '#0F141C',
          card: '#141A24',
          inset: '#080B10',
        },
        ink: {
          DEFAULT: '#E6E6E6',
          dim: '#9AA2B1',
          mute: '#5A6373',
        },
        phosphor: {
          DEFAULT: '#00FF9C',
          dim: '#00B36F',
          glow: '#3DFFB6',
        },
        amber: {
          DEFAULT: '#FFB000',
          dim: '#B37A00',
          glow: '#FFC73D',
        },
        alert: {
          DEFAULT: '#FF3864',
          dim: '#B32647',
          glow: '#FF6B8E',
        },
        line: '#1F2632',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        crt: ['"VT323"', '"Press Start 2P"', 'monospace'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'pixel-sm': '2px 2px 0 0 #0A0E14',
        'pixel': '4px 4px 0 0 #0A0E14',
        'pixel-lg': '6px 6px 0 0 #0A0E14',
        'phosphor': '0 0 0 2px #00FF9C, 4px 4px 0 0 #00B36F',
        'amber': '0 0 0 2px #FFB000, 4px 4px 0 0 #B37A00',
        'glow-phosphor': '0 0 12px rgba(0, 255, 156, 0.45)',
        'glow-amber': '0 0 12px rgba(255, 176, 0, 0.45)',
      },
      animation: {
        'crt-flicker': 'crt-flicker 4s infinite',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'scan': 'scan 8s linear infinite',
        'idle-bounce': 'idle-bounce 2s ease-in-out infinite',
      },
      keyframes: {
        'crt-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.985' },
        },
        'cursor-blink': {
          '0%, 50%': { opacity: '1' },
          '50.01%, 100%': { opacity: '0' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'idle-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
      },
    },
  },
  plugins: [],
};
