/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(0deg, #FF94A3, #DBD7D8)",
      },
      colors: {
        customPink: "#FFB6C1",
        customBlue: "#ADD8E6",
      },
    },
  },
  plugins: [],
};
