import type { Config } from 'tailwindcss';

export default {
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
        'dm-mono': ['DM Mono', 'monospace'],
      },
    },
  },
} satisfies Partial<Config>;
