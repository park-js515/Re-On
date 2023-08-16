/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    colors: {
      mainBlue: '#4094bf',
      lightBlue: '#8ccfd5',
      begie: '#f2ecda',
      white: '#ffffff',
      danger: '#e17389',
      warning: '#fde047',
      success: '#3b82f6',
      info: '#34d399',
      darkGray: '#4b5563',
      lightGray: '#9ca3af',
      inss: '#FAFFEA',
      green: '#75A94B',
      black: '#000000',
      indigo : '#4b0082',
      gray : '#d3d3d3',
      gold: '#FFD700',
      silver: '#C0C0C0',
      bronze: '#CD7F32',
      white2:'f8f8f8',
      blue:'#8ccfd5',
    },
    extend: {
      width: {
        '11/12': '91.666667%',
        '10/12': '83.333333%',
      },
      height: {
        '11/12': '91.666667%',
        '10/12': '83.333333%',
      },
      animation: {
        slideInFromLeft: 'slideInFromLeft 1.5s forwards',
        slideInFromRight: 'slideInFromRight 1.5s forwards',
        'slideInFromTop': 'slideInFromTop 1s ease-in-out'
      },
      backgroundImage: theme => ({
        'custom-gradient': 'linear-gradient(var(--angle, 0deg), #8ccfd5 0%, #a2d2d8 20%, #b8d5dc 40%, #ced8df 60%, #e4dbe2 80%, #f2ecda 100%)',
     })
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide'),
  ],
};
