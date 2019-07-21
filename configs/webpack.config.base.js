/**
 * Base webpack config used across other specific configs
 */

import AntdScssThemePlugin from 'antd-scss-theme-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import webpack from 'webpack'
import { dependencies } from '../package.json'

const lessLoader = AntdScssThemePlugin.themify({
  loader: 'less-loader',
  options: {
    sourceMap: process.env.NODE_ENV !== 'production' || false,
    javascriptEnabled: true,
  },
})

export default {
  externals: [...Object.keys(dependencies || {})],

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          'ts-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'sass-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: false,
              sourceMap: process.env.NODE_ENV !== 'production' || false,
            },
          },
          lessLoader,
        ],
      },
    ],
  },

  output: {
    path: path.join(__dirname, '..', 'app'),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2',
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),

    new webpack.NamedModulesPlugin(),
  ],
}
