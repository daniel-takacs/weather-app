const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
entry: './js/index.js',
output: {
filename: 'bundle.js',
path: path.resolve(__dirname, 'dist'),
},
mode: 'development',
module: {
rules: [
{

test: /\.css$/i,
use: [ 'style-loader', 'css-loader' ]
},
{
    test: /index.html$/i,
    use: [
    {
    loader: 'file-loader',
    options: {
    name: 'index.html'
    }
    }
    ]
    }
]
},
plugins: [
    new CleanWebpackPlugin()
    ]
};