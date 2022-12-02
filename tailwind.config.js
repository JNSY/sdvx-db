module.exports = {
  mode: 'jit',
  media: false, // 'media' or 'class',
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
    ],
    options: {
      // https://purgecss.com/safelisting.html#patterns
      safelist: {
        standard: [/^bg-/, /^text-/],
      },
    },
  },
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
  important: true
}