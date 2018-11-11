module.exports = {
  configureWebpack: {
    output: {
      path: __dirname + '/dist'
    },
    resolve: {
      alias: {
        '@': __dirname + '/src'
      }
    },
    entry: {
      app: './src/main.ts'
    }
  }
};
