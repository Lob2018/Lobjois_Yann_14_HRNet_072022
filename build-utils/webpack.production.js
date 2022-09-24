const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin");
// ANALYZE
//const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')

module.exports = () => ({
  // generates maps, source code not included but exposes filenames and structure
  devtool: 'nosources-source-map',
  output: {
    filename: 'production.js',
  },
  optimization: {
    minimizer: [
      // minify JS
      new UglifyJsPlugin({
        // enable file caching
        cache: true,
        // multi-process parallel running to improve the build speed
        parallel: true,
        // JS source maps for CSS
        sourceMap: true,
      }),
      // Minimize and optimize the CSS assets
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module: {
    rules: [
      {
        test: /\.sa?css$/,
        // MiniCssExtractPlugin extract css into separate files (1 per JS), with on-demand loading of CSS and SourceMaps
        // css-loader interpret and resolve @import and import/require()
        // sass-loader loads a Sass/SCSS file and compiles it to CSS
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [      
    new MiniCssExtractPlugin(),
    // Compress files with Gzip
    new CompressionPlugin(),  
    // ANALYZE
    //new WebpackBundleAnalyzer.BundleAnalyzerPlugin(),
  ],
})
