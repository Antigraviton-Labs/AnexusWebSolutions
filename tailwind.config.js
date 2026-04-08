module.exports = {
  content: ['./*.html', './animations.js'],
  theme: {
    extend: {
      colors: {
        'on-surface-variant': '#414753',
        'primary-container': '#0066cc',
        'surface-bright': '#f9f9ff',
        'outline-variant': '#c1c6d5',
        'on-secondary-fixed': '#00174b',
        background: '#f9f9ff',
        'secondary-container': '#346bf1',
        'on-surface': '#191c21',
        'on-secondary-fixed-variant': '#003da9',
        'secondary-fixed-dim': '#b4c5ff',
        primary: '#004e9f',
        'tertiary-fixed-dim': '#4edea3',
        tertiary: '#005c3e',
        'surface-container-high': '#e7e8ef',
        outline: '#727784',
        'on-primary-fixed-variant': '#00458e',
        'inverse-on-surface': '#f0f0f8',
        'inverse-surface': '#2e3036',
        secondary: '#0050d7',
        'on-tertiary': '#ffffff',
        'surface-dim': '#d9d9e1',
        error: '#ba1a1a',
        'error-container': '#ffdad6',
        'surface-container-lowest': '#ffffff',
        'on-tertiary-fixed': '#002113',
        'surface-container-highest': '#e1e2e9',
        'on-background': '#191c21',
        'on-primary-fixed': '#001b3e',
        'on-tertiary-fixed-variant': '#005236',
        'surface-container': '#ededf5',
        'surface-container-low': '#f3f3fb',
        'primary-fixed-dim': '#aac7ff',
        'tertiary-container': '#007751',
        'secondary-fixed': '#dbe1ff',
        'on-error-container': '#93000a',
        'on-error': '#ffffff',
        'on-secondary': '#ffffff',
        'surface-tint': '#005cba',
        'surface-variant': '#e1e2e9',
        'on-secondary-container': '#fefcff',
        'primary-fixed': '#d7e3ff',
        'on-primary-container': '#dfe8ff',
        'on-primary': '#ffffff',
        'inverse-primary': '#aac7ff',
        surface: '#f9f9ff',
        'on-tertiary-container': '#83ffc6',
        'tertiary-fixed': '#6ffbbe'
      },
      fontFamily: {
        headline: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        label: ['Inter', 'sans-serif']
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem'
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/container-queries')]
};
