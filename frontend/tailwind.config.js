/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",

  ],
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

    
    },
    extend: {
     
     
    },
  },
  plugins: [
    // require("flowbite/plugin"),
    require("@tailwindcss/typography"),
    // require("tailwind-scrollbar-hide"),
  ],
}
