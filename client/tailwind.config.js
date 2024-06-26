/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    fontFamily: {
      main: ["Poppins", "sans-serif"],
    },
    listStyleType: {
      square: "square",
      roman: "upper-roman",
    },
    extend: {
      width: {
        main: "1000px",
      },
      gridTemplateRows: {
        // Simple 16 row grid
        10: "repeat(10, minmax(0, 1fr))",

        // Complex site-specific row configuration
        layout: "200px minmax(900px, 1fr) 100px",
      },
      gridRow: {
        "span-7": "span 7 / span 7",
      },
      backgroundColor: {
        main: "#12CBC4",
      },
      colors: {
        // main: "#ee3131",
        main: "#12CBC4",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
      },
      keyframes: {
        "slide-top": {
          "0%": {
            "-webkit-transform": "translateY(0);",
            transform: "translateY(0);",
          },
          "100%": {
            "-webkit-transform": "translateY(-20px);",
            transform: "translateY(-20px);",
          },
        },
        "slide-top-sm": {
          "0%": {
            "-webkit-transform": "translateY(0px);",
            transform: "translateY(0px);",
          },
          "100%": {
            "-webkit-transform": "translateY(-1px);",
            transform: "translateY(-1px);",
          },
        },
      },
      animation: {
        "slide-top":
          "slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-top-sm": "slide-top-sm 0.2s linear both;",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
