/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily : {
        sans: ["Figtree-Regular", "system-ui", "sans-serif"],
        boldB: ["Figtree-Bold", "system-ui", "sans-serif"],
        mediumM: ["Figtree-Medium","system-ui","sans-serif"],
        semiboldS: ["Figtree-SemiBold","system-ui","sans-serif"]
      }
    },
  },
  plugins: [],
}

