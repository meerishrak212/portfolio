/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // আপনার যোগ করা ফন্ট ফ্যামিলি
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'playfair': ['"Playfair Display"', 'serif'],
        'caveat': ['Caveat', 'cursive'],
      },
      // আপনার যোগ করা কাস্টম রং
      colors: {
        'brand-purple': '#6B72EB',
        'light-cyan': '#A5F3FC',
        'bright-yellow': '#FBBF24',
        'creamy-white': '#FEFDE8',
        'dark-text': '#111827',
      },
      // নতুন অ্যানিমেশন যোগ করা হয়েছে
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}