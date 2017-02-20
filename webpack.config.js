var webpack = require('webpack');
var path = require('path');

var bower_dir = __dirname + '/bower_components',
    node_dir = __dirname + '/node_modules',
    lib_dir = __dirname + '/public/libs';

var config = {
    // The resolve.alias object takes require expressions 
    // (require('react')) as keys and filepath to actual
    // module as values
    resolve: {
        alias: {
            react: node_dir + '/react',
            "react-dom": node_dir + '/react-dom',
            jquery: node_dir + '/jquery/dist/jquery.min.js',
            elastic: lib_dir + '/jquery.elastic.source.js',
            avgrund: lib_dir + '/avgrund.js'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': "jquery",
            'jQuery': "jquery",
            'window.jQuery': "jquery",
            'window.$': 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'dist/js/vendors.js',
            minChunks: 2,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
    ],

    entry: {
        login: ['./public/src/js/login.js'],
        todos: ['./public/src/js/todos.js'],
        vendors: ['react', 'jquery', 'elastic', 'avgrund']
    },

    output: {
        path: path.join(__dirname, "public"),
        filename: 'dist/js/[name].bundle.js',
        libraryTarget: "umd"
    },

    module: {
        noParse: [
            new RegExp(lib_dir + './react.js'),
            new RegExp(lib_dir + './react-dom.js'),
            //new RegExp(lib_dir +'/jquery-1.11.2.min.js'),
        ],
        rules: [{
            test: /\.jsx?$/,
            loaders: ['react-hot-loader'],
            include: path.join(__dirname, 'public')

        }, {
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            },
            include: path.join(__dirname, 'public')
        }]
    }
}

module.exports = config;