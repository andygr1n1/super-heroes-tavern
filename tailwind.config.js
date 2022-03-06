const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,ts}"],

  theme: {
    fontFamily: {
      serif: ["Roboto Slab", ...defaultTheme.fontFamily.serif],
      lato: ["Lato", ...defaultTheme.fontFamily.mono],
      slab: ["Roboto Slab", ...defaultTheme.fontFamily.mono],
    },
    extend: {},
  },
  plugins: [],
};
