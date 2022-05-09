const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        // pathRewrite: { '^/api': '' },
        secure: false,
        changeOrigin: true
      }
    },
  }
})
