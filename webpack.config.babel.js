
import webpack            from 'webpack';
import path               from 'path';
import htmlWebpackPlugin  from 'html-webpack-plugin';
import webpackMerge       from 'webpack-merge';

const ROOT_PATH           = path.resolve(__dirname);
const APP_PATH            = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH          = path.resolve(ROOT_PATH, 'dist');

const TARGET = process.env.npm_lifecycle_event;
const ENDPOINT = '"http://hearth-api.dev"';

process.env.BABEL_ENV = TARGET;
var config;

var common = {
  entry: APP_PATH,
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.(css|scss)$/,
      loaders: [
        require.resolve('style-loader'),
        require.resolve('css-loader') + '?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        require.resolve('sass-loader') + '?sourceMap'
      ],
      include: path.resolve(ROOT_PATH, 'node_modules', 'react-toolbox', 'lib')
    },{
      test: /\.(sass|scss)$/,
      loader: 'style!css!sass?outputStyle=expanded&indentedSyntax',
      include: path.resolve(APP_PATH, 'styles')
    },{
      test: /\.(ttf|woff)$/,
      loader: 'base64-font-loader',
      include: path.resolve(APP_PATH, 'assets')
    },{
      test: /\.(png|jpg|gif)$/,
      loader: "url-loader?limit=1000000",
      include: path.resolve(APP_PATH, 'assets')
    },{
      test: /\.(js|jsx)$/,
      loaders: ['babel'],
      include: APP_PATH
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    modulesDirectories: ["node_modules"],
    alias: {
      components: path.resolve(APP_PATH, 'components'),
      stores:     path.resolve(APP_PATH, 'stores'),
      actions:    path.resolve(APP_PATH, 'actions'),
      api:        path.resolve(APP_PATH, 'api'),
      dispatcher: path.resolve(APP_PATH, 'dispatcher'),
      constants:  path.resolve(APP_PATH, 'constants'),
      assets:     path.resolve(APP_PATH, 'assets'),
      styles:     path.resolve(APP_PATH, 'styles')

    }
  },
  plugins: [
    new htmlWebpackPlugin({
      title: "App"
    })
  ]
};

if (TARGET === 'start' || !TARGET) {
  config = webpackMerge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallbacks: true,
      hot: true,
      port: 8000,
      inline: true,
      progress: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ]
  });
} else {
  config = webpackMerge(common, {
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
    ]
    //production specific config goes here
  });
}

export default config;
