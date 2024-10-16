const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js', // 入口文件
    // action: './src/action.js',
  },
  output: {
    filename: 'js/[name].[contenthash:8].js',// 輸出文件名
    // filename: 'bundle.js', // 輸出文件名
    path: path.resolve(__dirname, 'dist'), // 輸出目錄
    assetModuleFilename: 'images/[name].[hash:8][ext][query]', //控制asset類型輸出位置，說明 https://webpack.js.org/guides/asset-modules/
    clean: true, // 每次打包前清空輸出目錄
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        type: 'asset/resource'
        //file-loader 已改用 asset/resource，說明 https://webpack.js.org/guides/asset-modules/
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader'], // 處理 CSS 文件
      },
      {
        test: /\.s[ac]ss$/i, // 處理 SASS/SCSS 文件
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],// 注意順序，先加載 Sass，再轉換為 CSS
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'//這邊以上是新增
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html', // 指定 HTML 模板
      filename: 'index.html',
    }),
  ],
  mode: 'production', // 設定模式為生產環境
};