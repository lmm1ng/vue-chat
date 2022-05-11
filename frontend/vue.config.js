const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        // pathRewrite: { '^/api': '' },
        secure: false,
        changeOrigin: true
      },
      '/socket.io': {
        target: 'http://localhost:5000',
        ws: true,
        changeOrigin: true
      }
    }
  }
})
