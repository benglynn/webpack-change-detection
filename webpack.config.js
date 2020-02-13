const path = require('path');
const HtmlPlugin = require('./plugins/html-plugin');

module.exports = {
    mode: 'development',
    entry: { app: './src/app.js' },
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist')   
    },
    plugins: [
        new HtmlPlugin()
    ]
}