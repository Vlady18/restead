const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

ENTRY_PATH = path.resolve(__dirname, "src/index")
DIST_PATH = path.resolve(__dirname, "dist")

module.exports = {
    entry: {
        main: ENTRY_PATH,
    },
    output: {
        path: DIST_PATH,
        filename: "[name].[contenthash].js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i, // SCSS and SASS files
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [require('autoprefixer')],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/, // Plain CSS files
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i, // Images
                type: 'asset',
                generator: {
                    filename: 'assets/images/[name].[hash][ext][query]', // Output folder and hash for images
                },
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "src/index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css', // Output CSS with hash
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets',
                    to: 'assets' // copies all files to dist/assets
                }
            ]
        })
    ],
    // resolve: {
    //     extensions: ['.js', '.jsx', '.scss', '.css'],
    // },
    devtool: "inline-source-map",
    devServer: {
        watchFiles: ["src/*.html", "src/*/*.scss"],
        static: DIST_PATH,
        hot: true,
    },
};
