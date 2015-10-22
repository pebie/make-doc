process.env.NODE_ENV = 'development';

import WebpackDevServer from 'webpack-dev-server';
import CleanPlugin from 'clean-webpack-plugin';
import WebpackConfig from './make-webpack-config';
import webpack from 'webpack';
import path from 'path';

let options = {
  hotComponents: true,
  separateStylesheet: false,
  srcPath: path.join(process.cwd(), 'doc'),
  debug: true,
  devtool: 'eval-cheap-module-source-map'
};
let myConfig = Object.create(WebpackConfig(options));

if (require.main === module && 'development' === process.env.NODE_ENV) {


  new WebpackDevServer(webpack(myConfig), {
    publicPath: myConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: [
      {
        path: new RegExp('/api/(.*)'),
        target: 'http://localhost:3001/'
      }
    ],
    stats: {
      colors: true
    }
  }).listen(8080, 'localhost', function (err) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    console.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/');
  });
}
