/** @type {import('tailwindcss').Config} */
//eslint-disable-next-line
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // telling the path to jsx files
  theme: {
    //overrides the property of tailwind
    fontFamily: {
      sans: 'Roboto Mono, monospace',
    },
    extend: {
      //adds to the list
      // colors: {
      //   pizza: '#123456',
      // },
      height: {
        screen: '100dvh', // dynamic viewport height -> to fix in mobile browsers full screeen issue
      },
    },
  },
  plugins: [],
};

//changing the defaults of tailwind
