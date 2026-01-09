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
            },
            colors: {
                arson: {
                    beige: '#EBE9DF',
                    red: '#D16D6A',
                    black: '#1A1A1A',
                }
            }
        },
    },
    plugins: [],
}
