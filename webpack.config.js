module.exports = {
    entry: {
      dlc: './src/dlc/dlcApp.ts',
      bundle: './src/app.ts',
    },
    mode: 'development',
    output: {
        filename: 'build/[name].js'
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