const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    main: path.resolve(__dirname, 'client', 'src', 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? '[fullhash].js' : '[name].js',
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'client', 'index.html'),
    }),
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    minimize: isProduction,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client', 'src'),
    },
  },
  devtool: 'source-map',
  devServer: {
    static: './dist',
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
};
