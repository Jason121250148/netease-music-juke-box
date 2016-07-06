const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
    context: path.resolve(__dirname, "./src"),
    entry: {
        vendor: [ "jquery" ],
        // nju: [ "./nju/resource/index.less" ],
        nm: [ "./nm/index.js", "./nm/resource/index.less" ]
    },
    output: {
        path: "./assets",
        publicPath: "/assets",
        filename: "[name]/bundle.js"//name对应entry的key：vendor和nm
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loaders: [
                    "babel-loader?sourceRoot=./src"
                ]
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")//这样不会把css编译到js文件中，会单独生成
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",//对应entry的vendor
            filename: "vendor.js",
            minChunks: Infinity
        }),
        new ExtractTextPlugin("./[name]/resource/bundle.css")
    ]
};
