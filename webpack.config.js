const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ["babel-polyfill","./src/index.js"],
    output: {
        filename: "main.js",
        publicPath: '/',
    },
    module: {
        rules:[
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                exclude: [ /node_modules/],
                use: [
                  { loader: 'eslint-loader' }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: [ /node_modules/ ],
                use: [
                    { loader: 'babel-loader', options: { babelrc: true } },

                ]
            },
            {
                test:/\.css$/,
                use:["style-loader", "css-loader"]
            },
            {
                test: /\.(png|ico)$/,
                use: 'file-loader?name=images/[name].[ext]',
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?name=fonts/[name].[ext]&limit=10000',
            },
        ]
    },
    devServer: {
        historyApiFallback: true,
      },
    plugins:[new HtmlWebpackPlugin({template: "./public/index.html"})]
}
