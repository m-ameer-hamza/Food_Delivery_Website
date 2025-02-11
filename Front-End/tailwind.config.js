/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#39DB4A",
        red: "#ff6868",
        secondary: "#555",
        primaryBD: "#FCFCFC",
      },
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
      },
      keyframes: {
        underline: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-4px)" },
          "50%": { transform: "translateX(4px)" },
          "75%": { transform: "translateX(-4px)" },
        },
      },
      animation: {
        underline: "underline 0.5s ease-in-out forwards",
        shake: "shake 0.5s ease-in-out",
      },
    },
  },
  plugins: [daisyui],
};
