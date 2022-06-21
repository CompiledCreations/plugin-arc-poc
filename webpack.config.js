const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  console.log("Mode:", isProduction ? "production" : "development", env, argv);

  return {
    entry: "./src/main.tsx",
    mode: isProduction ? "production" : "development",
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    plugins: [
      isProduction ? new MiniCssExtractPlugin() : undefined,
      new BundleAnalyzerPlugin(),
      new CopyPlugin({
        patterns: ["public"],
      }),
    ].filter(Boolean),
    optimization: {
      splitChunks: {
        cacheGroups: {
          common: {
            name: "common",
            chunks: "all",
            minChunks: 2,
            minSize: 0,
          },
          vendor: {
            name: "vendor",
            test: /[\\/]node_modules[\\/]/,
            chunks: "all",
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,

          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
          ],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
  };
};
