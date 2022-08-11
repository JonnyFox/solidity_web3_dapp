const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
module.exports = defineConfig({
  transpileDependencies: [],
  configureWebpack: {
    resolve:{
      alias: {
        "http": require.resolve("stream-http")
      }
    },
    plugins: [
      new NodePolyfillPlugin()
    ]
  }
})
