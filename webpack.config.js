const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: [
        './app/routes/routes.ts',
        './app/components/app.scss'
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'messenger.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                        },
                    },
                ],
                exclude: /(node_modules)/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "sass-loader",
                    },
                    // {
                    //     loader: "style-loader",
                    // }
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./style.min.css"
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        writeToDisk: true,
        hot: true,
        port: 9000,
    },
};