import { nextui } from "@nextui-org/react";
import { Config } from 'tailwindcss'
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
      ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui()],
} satisfies Config

