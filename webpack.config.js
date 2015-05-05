const path = require('path');

module.exports = {
  entry: './main.js',

  output: {
    filename: 'bundle.js'
  },

  resolve: {
    modulesDirectories: ['components', 'node_modules'],
    extensions: ["", ".js", ".jsx"],
    fallback: path.join(__dirname, "node_modules")
  },

  resolveLoader: { fallback: path.join(__dirname, "node_modules") },

  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          optional: ["es7.decorators", "es7.classProperties"]
        }
      }
    ]
  }

};
