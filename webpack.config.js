const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const dotenv = require("dotenv");
const path = require("path");

module.exports = (env) => {
  const { ENV, CHECK_BUNDLE } = env;
  dotenv.config({
    path:
      ENV === "production"
        ? path.resolve(__dirname, ".env")
        : path.resolve(__dirname, ".env.development"),
  });

  const isProduction = process.env.NODE_ENV === "production" ? true : false;
  const port = process.env.PORT || 3000;

  const config = {
    mode: process.env.NODE_ENV,
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contentHash].js",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
    module: {
      rules: [
        // {
        //   test: /\.tsx?$/,
        //   exclude: /node_modules/,
        //   loader: "ts-loader",
        // },
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   use: {
        //     loader: "babel-loader",
        //   },
        // },
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: isProduction
                ? MiniCssExtractPlugin.loader
                : "style-loader",
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                importLoaders: 3,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: [autoprefixer],
              },
            },
            "resolve-url-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
          ],
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: "url-loader?limit=5000",
        },
        {
          test: /\.(csv)$/,
          use: ["file-loader"],
        },
        {
          test: /\.svg$/,
          issuer: /\.(ts|js)x?$/,
          use: ["@svgr/webpack", "url-loader"],
        },
        // {
        //   test: /\.svg$/,
        //   issuer: /\.(ts|js)x?$/,
        //   loader: "svg-react-loader",
        // },
        {
          test: /\.svg$/,
          issuer: /\.scss$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 90000,
              },
            },
            {
              loader: "svgo-loader",
              options: {
                plugins: [
                  { removeTitle: true },
                  { convertColors: { shorthex: false } },
                  { convertPathData: false },
                ],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new webpack.DefinePlugin({
        "process.env.API_KEY": JSON.stringify(process.env.API_KEY),
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      }),
    ],
  };

  if (isProduction) {
    config.devtool = "hidden-source-map";
    config.optimization.minimizer = [new UglifyJsPlugin()];
    config.plugins.push(
      new MiniCssExtractPlugin(),
      new OptimizeCssAssetsPlugin()
    );
  } else {
    config.devtool = "inline-source-map";
    config.devServer = {
      host: "localhost",
      port: port,
      historyApiFallback: true,
      open: true,
    };
  }

  if (CHECK_BUNDLE) {
    config.plugins.unshift(new BundleAnalyzerPlugin());
  }

  return config;
};
