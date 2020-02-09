const path = require('path');

module.exports = {
    entry: './js/app-ES6/boot.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist'),
        publicPath: 'dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}