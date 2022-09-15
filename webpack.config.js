const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const modeConfiguration = (env) => require(`./build-utils/webpack.${env}`)(env)

const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const options = {
  short_name: 'React App',
  name: 'Create React App Sample',
  icons: [
    {
      src: 'favicon.ico',
      sizes: '64x64 32x32 24x24 16x16',
      type: 'image/x-icon',
    },
    {
      src: 'logo192.png',
      type: 'image/png',
      sizes: '192x192',
    },
    {
      src: 'logo512.png',
      type: 'image/png',
      sizes: '512x512',
    },
  ],
  start_url: '.',
  display: 'standalone',
  theme_color: '#000000',
  background_color: '#ffffff',
}

module.exports = ({ mode } = { mode: 'production' }) => {
  console.log(`mode is: ${mode}`)

  return merge(
    {
      mode,
      entry: './src/index.tsx',
      devServer: {
        open: true,
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
