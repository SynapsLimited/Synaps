/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. Specify the paths to all of your template files
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}', // Adjust this path based on your project structure
    './public/index.html',
  ],
  theme: {
    extend: {
      // 2. Extend the color palette with your custom CSS variables
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        'background-transparent': 'var(--color-background-transparent)',
        'background-transparent-post': 'var(--color-background-transparent-post)',
        'secondary-transparent': 'var(--color-secondary-transparent)',
        'primary-transparent': 'var(--color-primary-transparent)',
        white: 'var(--color-white)',
      },
      // 3. Extend zIndex to include higher values if necessary
      zIndex: {
        '10000': '10000',
      },
      // 4. Extend width with custom container and form widths
      width: {
        'container-lg': 'var(--container-width-lg)',
        'container-md': 'var(--container-width-md)',
        'container-sm': 'var(--container-width-sm)',
        'form-width': 'var(--form-width)',
      },
      // 5. Extend transition properties
      transitionProperty: {
        'width': 'width',
        'height': 'height',
      },
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        'ease': 'ease',
      },
    },
  },
  plugins: [],
};
