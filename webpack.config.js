var HTMLWebpackPlugin       = require('html-webpack-plugin'),
    CopyWebpackPlugin       = require('copy-webpack-plugin'),
    HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
        template: __dirname + '/src/index.html',
        filename: 'index.html',
        inject: 'body'
    }),
    CopyWebpackPluginConfig = new CopyWebpackPlugin({
        patterns: [
            { from: '_redirects' },
            { from: 'robots.txt' }
        ]
    });


module.exports = {
    mode: 'production',
    entry: __dirname + '/src/index.js',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all",
                }
            }
        }
    },
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js',
        chunkFilename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        HTMLWebpackPluginConfig,
        CopyWebpackPluginConfig
    ],
    devServer: {
        host: '0.0.0.0',
        port: '8080',
        historyApiFallback: true
    }
};