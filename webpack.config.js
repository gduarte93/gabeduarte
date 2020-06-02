var HTMLWebpackPlugin       = require('html-webpack-plugin'),
    CopyWebpackPlugin       = require('copy-webpack-plugin'),
    HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
        template: __dirname + '/src/index.html',
        filename: 'index.html',
        inject: 'body'
    }),
    CopyWebpackPluginConfig = new CopyWebpackPlugin({
        patterns: [
            { from: '_redirects' }
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
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // Get node module name
                        var packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        // replace @ in url name just in case
                        return `npm.${packageName.replace('@', '__')}`;
                    }
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