const withOffline = require('next-offline')
const withCSS = require('@zeit/next-css')

module.exports = withOffline(withCSS({
  webpack(config) {
    config.module.rules.push({
      test: /\.js$/,
      use: [
        {
          loader: 'linaria/loader',
          options: {
            sourceMap: process.env.NODE_ENV !== 'production',
          },
        },
      ],
    })

    return config
  },
  exportPathMap() {
    return {
      '/': { page: '/' },
    }
  },
}))
