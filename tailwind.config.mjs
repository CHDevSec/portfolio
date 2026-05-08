/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Twilight Vault — Dark Edition (active palette)
        bg: {
          DEFAULT: '#050308',
          deep:    '#050308',
          surface: '#0C0712',
          card:    '#150E1F',
          inset:   '#020104',
          raised:  '#0C0712', // legacy alias → surface
        },
        ink: {
          DEFAULT:   '#D4D0E0',
          primary:   '#D4D0E0',
          secondary: '#8A8499',
          muted:     '#4A4456',
          dim:       '#8A8499', // legacy alias → secondary
          mute:      '#4A4456', // legacy alias → muted
        },
        primary: {
          DEFAULT: '#7C5CD8',
          glow:    '#9D82E5',
          dim:     '#4A3680',
        },
        gold: {
          DEFAULT: '#D4A82C',
          glow:    '#E8C25E',
          dim:     '#8A6F1C',
        },
        success: '#5BAA80',
        warning: '#D4A82C',
        danger:  '#C7547F',
        info:    '#5C8DD8',
        line: {
          DEFAULT: '#150E1F',
          subtle:  '#0C0712',
          accent:  '#4A3680',
        },
        // LEGACY aliases — point to new palette so existing `text-phosphor`/`bg-amber`/`text-alert`
        // classes auto-migrate. Remove next sprint after full audit. Terminal.astro is kept
        // authentic via scoped overrides in global.css.
        phosphor: {
          DEFAULT: '#7C5CD8',
          dim:     '#4A3680',
          glow:    '#9D82E5',
        },
        amber: {
          DEFAULT: '#D4A82C',
          dim:     '#8A6F1C',
          glow:    '#E8C25E',
        },
        alert: {
          DEFAULT: '#C7547F',
          dim:     '#8A2647',
          glow:    '#E07A9F',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        crt: ['"VT323"', '"Press Start 2P"', 'monospace'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'pixel-sm': '2px 2px 0 0 #4A3680',
        'pixel': '4px 4px 0 0 #4A3680',
        'pixel-lg': '6px 6px 0 0 #4A3680',
        'phosphor': '0 0 0 2px #7C5CD8, 4px 4px 0 0 #4A3680',
        'amber': '0 0 0 2px #D4A82C, 4px 4px 0 0 #8A6F1C',
        'glow-phosphor': '0 0 12px rgba(124, 92, 216, 0.45)',
        'glow-amber': '0 0 12px rgba(212, 168, 44, 0.45)',
      },
      animation: {
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        'cursor-blink': {
          '0%, 50%': { opacity: '1' },
          '50.01%, 100%': { opacity: '0' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
