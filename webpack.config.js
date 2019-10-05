module.exports = {
    entry: './src/app.ts',
    mode: 'development',
    output: {
        filename: 'build/bundle.js'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ }
        ]
    },
    devServer: {
        disableHostCheck: true
    }
}