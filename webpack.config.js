module.exports = {
    entry: './src/app.ts', // might need fixing
    output: {
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader'}
        ]
    }
}