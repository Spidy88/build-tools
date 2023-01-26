module.exports = {
    mode: process.env.NODE_ENV || 'development',
    output: {
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.(js)$/,
            loader: require.resolve('babel-loader')
        }]
    }
}
