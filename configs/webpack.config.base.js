/**
 * Base webpack config used across other specific configs
 */

import AntdScssThemePlugin from 'antd-scss-theme-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import postcssPresetEnv from 'postcss-preset-env'
import path from 'path'
import webpack from 'webpack'
import { dependencies } from '../package.json'

const DEVELOPMENT_MODE = process.env.NODE_ENV !== 'production'

const CssModuleLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 2,
    modules: true,
    camelCase: true,
    sourceMap: DEVELOPMENT_MODE,
    localIdentName: DEVELOPMENT_MODE
      ? '[folder]__[name]__[local]__[hash:base64:5]'
      : '[hash:base64:5]',
  },
}

const CssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 2,
    modules: false,
    sourceMap: DEVELOPMENT_MODE,
  },
}

export const PostCssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    sourceMap: DEVELOPMENT_MODE,
    plugins: () => [postcssPresetEnv()],
  },
}

const SassLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: DEVELOPMENT_MODE,
  },
}

export const LessLoader = AntdScssThemePlugin.themify({
  loader: 'less-loader',
  options: {
    sourceMap: DEVELOPMENT_MODE,
    javascriptEnabled: true,
  },
})

const SassHotLoader = {
  loader: 'css-hot-loader',
}

const SassHotModuleLoader = {
  loader: 'css-hot-loader',
  options: {
    cssModules: true,
  },
}

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
        test: /\.global|vars\.scss$/,
        use: [
          SassHotLoader,
          MiniCssExtractPlugin.loader,
          CssLoader,
          PostCssLoader,
          SassLoader,
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.glogal|vars\.scss$/,
        use: [
          SassHotModuleLoader,
          MiniCssExtractPlugin.loader,
          CssModuleLoader,
          PostCssLoader,
          SassLoader,
        ],
      },
      {
        test: /\.less$/,
        use: [
          SassHotLoader,
          MiniCssExtractPlugin.loader,
          CssLoader,
          LessLoader,
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

    new AntdScssThemePlugin(
      path.resolve(__dirname, '..', 'app', 'themes', 'Ant.vars.scss')
    ),

    new webpack.NamedModulesPlugin(),
  ],
}
