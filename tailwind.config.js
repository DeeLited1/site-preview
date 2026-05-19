/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        zentry: ["zentry", "sans-serif"],
        barlow: ["Barlow Condensed", "sans-serif"],
        general: ["general", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-serif"],
        "robert-regular": ["robert-regular", "sans-serif"],
      },
      colors: {
        blue: {
          50: "#e0f7fa",
          75: "#0a0a0a",
          100: "#f0fffe",
          200: "#010101",
          300: "#00e5ff",
        },
        violet: {
          300: "#00bcd4",
        },
        yellow: {
          100: "#00897b",
          300: "#00e5ff",
        },
      },
    },
  },
  plugins: [],
};
