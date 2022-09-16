const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const modeConfiguration = (env) => require(`./build-utils/webpack.${env}`)(env)

const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const options = {}

const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = ({ mode } = { mode: 'production' }) => {
  console.log(`mode is: ${mode}`)

  return merge(
    {
      mode,
      entry: './src/index.tsx',
      devServer: {
        open: true,
      },
      optimization: {
        splitChunks: {
          chunks: 'async',
          minChunks: 2,
        },
      },
      module: {
        rules: [
          {
            test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|ico)(\?[a-z0-9=.]+)?$/,
            exclude: /node_modules/,
            use: ['url-loader', 'file-loader?name=[name].[ext]'],
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              plugins: ['lodash'],
              presets: ['env', { modules: false, targets: { node: 4 } }],
            },
          },
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html',
          filename: './index.html',
          favicon: './public/favicon.ico',
        }),
        new WebpackManifestPlugin(options),
        new LodashModuleReplacementPlugin(),
        new UglifyJsPlugin(),
      ],
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
      output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
      },
    },
    modeConfiguration(mode)
  )
}
