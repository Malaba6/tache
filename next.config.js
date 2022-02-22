const { i18n } = require('./next-i18next.config');
module.exports = {
  i18n,
  reactStrictMode: true,
  // experimental: {
    // concurrentFeatures: true,
    // serverComponents: true,
  // },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/public',
  },
}
