const path = require( 'path' );
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

const JS_DIR = path.resolve( __dirname, 'src/js' );

module.exports = {
    entry: {
        main: __dirname+'/src/main.js'
    },
    output: {
        path: __dirname+'/dist',
        filename: 'bundle.js'
    },
    resolve : {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ]
            },
            {
                test: /\.js?$/,
                include: [ JS_DIR ],
                use: 'babel-loader',
                exclude: '/node_modules/'
            },
            { test: /\.hbs$/, loader: 'handlebars-loader' }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            title: 'Esempio carrello',
            template: 'src/index.html'
        })
    ]
};
