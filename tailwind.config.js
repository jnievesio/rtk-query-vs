/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const colors = require('tailwindcss/colors');

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'sym-primary': {
                    200: '#e35000',
                    300: '#e97333',
                    400: '#fa8a0e',
                    500: '#fa8a0e',
                    600: '#b64000',
                    700: '#9f3800',
                    800: '#883000',
                    900: '#722800',
                },
                'sym-sidebar': colors.slate,
                'sym-background': colors.gray[200],
                'sym-loader-1': '#787878',
                'sym-loader-2': '#63a1ff',
            },
        },
    },
    // eslint-disable-next-line global-require
    plugins: [require('@tailwindcss/forms')],
};
