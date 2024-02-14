/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(0deg, #FFB6C1, #FCF0F0, #FCF0F0)",
      },
      fontFamily:{
        "italianno": "italianno",
        "playFair": "Play fair"
      },

      //#DBD7D8
      colors: {
        customPink: "#FFB6C1",
        customBlue: "#97DAF0",
        customBg: "#FCF0F0",
      },
    },
  },
  plugins: [],
};
