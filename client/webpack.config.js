const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'kovan'

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    index: ['./src/index.tsx'],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js'
  },
	optimization: {
		minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: true,
          mangle: false,
        },
      }),
    ],
	},
  plugins: [
    new HtmlWebpackPlugin({
      title: 'MicroMix',
      template: './src/index.html'
    })
  ],
  externals: /^(worker_threads)$/,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "sass-loader"],
    },
    {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  }
};