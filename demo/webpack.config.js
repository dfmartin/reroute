const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/app.tsx',
  watch: true,
  output: {
    path: path.resolve(__dirname + 'dist'),
    filename: "index_bundle.js",
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      loader: 'babel-loader',
      query: {
        presets: [
          ["@babel/env", {
            "targets": {
              "browsers": "last 2 chrome versions"
            }
          }]
        ]
      }
    },
    {
      test: /.(ts|tsx)$/,
      include: [
        path.resolve(__dirname, 'src'),
      ],
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      ]
    }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      hash: true,
      filename: 'index.html',
      template: './src/public/index.html'
    })
  ],
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.ts', '.tsx']
  },
};