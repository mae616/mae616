/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Shippori: ["Shippori Antique B1", "sans-serif"],
        Zenkaku: ["Zen Kaku Gothic Antique", "sans-serif"],
      },
      backgroundImage: {
        color: "url('/src/assets/images/background.png')",
      },
    },
  },
  plugins: [],
};
