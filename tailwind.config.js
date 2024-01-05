/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mainBgColor: '#0D1117',
        columnBgColor: '#191c23',
      },
      screens: {
        ssm: '490px',
        sssm: '340px',
      },
    },
  },
  plugins: [],
}
