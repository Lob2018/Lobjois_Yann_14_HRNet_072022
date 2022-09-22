const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const modeConfiguration = (env) => require(`./build-utils/webpack.${env}`)(env)

const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const options = {}

const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = ({ mode } = { mode: 'production' }) => {
  console.log(`mode is: ${mode}`)

  return merge(
    {
      // current mode
      mode,
      // the top file of the app
      entry: './src/index.tsx',
      // in the dev mode it opens the app in the server
      devServer: {
        open: true,
      },
      optimization: {
        // chunks strategies
        splitChunks: {
          chunks: 'async',
          // the minimum times must a module be shared among chunks before splitting (here we've one file sharing common dependencies)
          minChunks: 1,
        },
      },
      module: {
        rules: [
          {
            // file-loader and url-loader emits the files into the output directory
            // url-loader can return as a DataURL if it is smaller than 8192 byte
            test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|ico)(\?[a-z0-9=.]+)?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                },
              },
              'file-loader?name=[name].[ext]',
            ],
          },
          {
            // tells webpack to load the .bavelrc file
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              plugins: ['lodash'],
              presets: ['env', { modules: false, targets: { node: 6 } }],
            },
          },
          {
            // Typescript loader for webpack
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            // style-loader : Inject CSS into the DOM
            // css-loader : interpret and resolve @import and import/require()
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
        new CopyPlugin({
          patterns: [{ from: './public/_redirects', to: '' }],
        }),
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
