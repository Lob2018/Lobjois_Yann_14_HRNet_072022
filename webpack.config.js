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
  // console.log(`mode is: ${mode}`)

  // concatenante the generic configurations (1st arg) and the prod or dev configuration (2nd arg)
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
            test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|ico)(\?[a-z0-9=.]+)?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'url-loader',
              },
              'file-loader?name=[name].[ext]',
            ],
          },
          {
            // tells webpack to load the .bavelrc file
            // use lodash to import only things that needed to be imported from lodash
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
        // used to achieve what loaders cannot
        new HtmlWebpackPlugin({
          template: './public/index.html',
          filename: './index.html',
          favicon: './public/favicon.ico',
        }),
        // generate an asset manifest
        new WebpackManifestPlugin(options),
        // create smaller lodash builds
        new LodashModuleReplacementPlugin(),
        // minify JS
        new UglifyJsPlugin(),
        // copies the _redirects file for Netlify to the build directory
        new CopyPlugin({
          patterns: [
            { from: './public/_redirects', to: '' },
            { from: './public/robots.txt', to: '' },
          ],
        }),
      ],
      resolve: {
        // resolve this extensions first (even with the same name)
        extensions: ['.tsx', '.ts', '.js'],
      },
      // tells webpack to call, the folder and the bundled JS
      output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
      },
    },
    // function that loads the mode we're in (dev or prod)
    modeConfiguration(mode)
  )
}
