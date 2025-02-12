/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}", // added path
    "./widgets/**/*.{js,ts,jsx,tsx,mdx}", // added path
  ],
  theme: {
    extend: {
    },
  },
  plugins: [],
};
