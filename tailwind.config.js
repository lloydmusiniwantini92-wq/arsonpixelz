/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
                syne: ['Syne', 'sans-serif'],
                display: ['Anton', 'sans-serif'],
                rajdhani: ['Rajdhani', 'sans-serif'],
            },
            colors: {
                arson: {
                    black: '#000000',
                    orange: '#FF3E00',
                    white: '#FFFFFF',
                }
            },
            keyframes: {
                sweep: {
                    '0%': { transform: 'translateX(-100%)' },
                    '50%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(100%)' }
                }
            }
        },
    },
    plugins: [],
}
