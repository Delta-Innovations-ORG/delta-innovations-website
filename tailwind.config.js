/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0F172A',
          navyLight: '#1E293B',
          navyCard: '#1F2937',
          cyan: '#22D3EE',
          cyanDark: '#06B6D4',
          emerald: '#10B981',
          emeraldLight: '#34D399',
          violet: '#8B5CF6',
          violetLight: '#A78BFA',
          amber: '#F59E0B',
          amberLight: '#FBBF24',
          rose: '#F43F5E',
          roseLight: '#FB7185',
          light: '#F8FAFC',
          muted: '#94A3B8',
          mutedLight: '#CBD5E1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #22D3EE 0%, #10B981 100%)',
        'brand-gradient-subtle': 'linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(16,185,129,0.15) 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
        'mesh-violet': 'radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(34,211,238,0.1) 0%, transparent 50%)',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(34, 211, 238, 0.45)',
        'glow-green': '0 0 40px -10px rgba(16, 185, 129, 0.4)',
        'glow-violet': '0 0 40px -10px rgba(139, 92, 246, 0.4)',
        'glow-amber': '0 0 40px -10px rgba(245, 158, 11, 0.35)',
        card: '0 4px 24px rgba(0, 0, 0, 0.35)',
        lift: '0 20px 40px -15px rgba(34, 211, 238, 0.25), 0 8px 16px -8px rgba(0,0,0,0.4)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        orbit: 'orbit 20s linear infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
        gradientShift: 'gradientShift 8s ease infinite',
        marqueeRTL: 'marqueeRTL 40s linear infinite',
        pulseBtn: 'pulseBtn 2s ease-in-out infinite',
        heroRingReverse: 'heroRingReverse 14s linear infinite',
        heroParticleOrbit: 'heroParticleOrbit 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marqueeRTL: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseBtn: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(34, 211, 238, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(34, 211, 238, 0)' },
        },
        heroRingReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        heroParticleOrbit: {
          '0%': { transform: 'rotate(0deg) translateX(var(--orbit-r, 140px)) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(var(--orbit-r, 140px)) rotate(-360deg)' },
        },
      },
    },
  },
  plugins: [],
};
