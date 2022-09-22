const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')

module.exports = () => ({
  // generates maps, source code not included but exposes filenames and structure
  devtool: 'nosources-source-map',
  output: {
    filename: 'production.js',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module: {
    rules: [
      {
        test: /\.sa?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new WebpackBundleAnalyzer.BundleAnalyzerPlugin(),
  ],
})
