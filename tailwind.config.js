module.exports = {
    content: [],
    theme: {
      container: {
        center: true,
        padding: '2rem',        
      },
      extend: {
        flexBasis: {
          '1/7': '14.2857143%'
        }
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }