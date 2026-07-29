import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#05090a',
        foreground: '#e6eef4',
        text: '#e6eef4',
        primary: {
          DEFAULT: '#97c0d3',
          foreground: '#05090a'
        },
        secondary: {
          DEFAULT: '#325f76',
          foreground: '#e6eef4'
        },
        accent: {
          DEFAULT: '#66996b',
          foreground: '#05090a'
        }
      },
    },
  },
  plugins: [],
};
export default config;
