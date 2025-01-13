/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hover-follow":
          "linear-gradient(107deg, rgba(171,68,89,1) 0%, rgba(242,159,88,1) 100%)",
      },
    },
  },
  plugins: [],
};
