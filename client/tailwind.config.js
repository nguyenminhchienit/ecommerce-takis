/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    fontFamily: {
      main: ["Poppins", "sans-serif"],
    },
    extend: {
      width: {
        main: "1000px",
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
  plugins: [],
};
