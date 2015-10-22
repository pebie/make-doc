/**
 * Created by bouchez on 31/07/15.
 */
import webpack from 'webpack';
import process from 'process';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import BowerWebpackPlugin from 'bower-webpack-plugin';

module.exports = ()=> {

  var plugins = [
    new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
    new HtmlWebpackPlugin({
      inject: true,
      template: './doc/index.html'
    }),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({excludes: /.*\.less/}),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ];

  if (process.env.NODE_ENV === 'production') {
    plugins.concat(
      [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
      ]
    );
  }

  return {
    get: (options)=> {
      if (options.hotComponents) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
      }

      if (options.separateStylesheet) {
        plugins.push(new ExtractTextPlugin('style.css', {
          allChunks: true
        }));
      }
      return plugins;
    }
  };
};
