/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'background-color' : '#F4FBF9',
        'text-color' : '#103216',
        'primary-color' : '#1A5043',
        'secondary-green' : '#2CAF51',
        'white-color' : '#fff',
        'red-color' : '#95233A',
        'alternative' : '#EDF2F4',
      },
    },
  },
  plugins: [],
}
