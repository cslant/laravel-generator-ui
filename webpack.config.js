const StylelintPlugin = require("stylelint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const config = {
    entry: {
        main: [
            "./src/js/material-dashboard.js",
        ],
        editor: {
            import: [
                // CSS
                './src/assets/css/style.css',

                // JS
                './src/assets/js/script.js',
            ]
        }
    },
    output: {
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "",
                        },
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                    },
                ],
            },
            {
                test: /\.svg/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 8192
                    }
                },
                use: 'svgo-loader'
            },
            {
                test: /\.png|jpg|gif/,
                type: "asset/resource",
            },
        ],
    },
    externals: {
        jquery: 'jQuery',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: 6,
                },
            }),
            new CssMinimizerPlugin()],
    },

    plugins: [
        /*new StylelintPlugin({
            files: ["./!**!/!*.{scss,sass}"],
            fix: true,
        }),*/
        new MiniCssExtractPlugin(),
    ],
};
module.exports = (env, argv) => {
    argv.mode === "development"
        ? (config.devtool = "eval-cheap-module-source-map")
        : (config.devtool = "source-map");

    return config;
};
