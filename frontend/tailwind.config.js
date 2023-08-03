/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    colors: {
      mainBlue: "#4094bf",
      lightBlue: "#8ccfd5",
      begie: "#f2ecda",
      white: "#ffffff",
      danger: "#ff4d4d",
      warning: "#fde047",
      success: "#3b82f6",
      info: "#34d399",
      darkGray: "#4b5563",
      lightGray: "#9ca3af",
      inss:"#D4E6A0"
    
    },
    extend: {
     
     
    },
  },
  plugins: [
     require("@tailwindcss/typography")
  ],
};
