/** @type {import("tailwindcss").Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Trebuchet MS", "Avenir Next", "Segoe UI", "sans-serif"],
        body: ["Avenir Next", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        panel: "0 24px 70px rgba(15, 23, 42, 0.14)"
      }
    }
  },
  plugins: []
};
