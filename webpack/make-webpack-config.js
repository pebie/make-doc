//First line seems to be mandatory :(
//Pebie made this code !
import loadersConfig from './config/loaders';
import pluginsConfig from './config/plugins';
import entryConfig from './config/entry';
import outputConfig from './config/output';
import resolveConfig from './config/resolve';
//This is a documentation test
//With multiline support

let WebpackConfig = (options)=> {
  let commonLoaders = loadersConfig().getCommons(options);
  let stylesheetLoaders = loadersConfig().getStylesheets(options);
  let imagesLoaders = loadersConfig().getImages(options);
  let plugins = pluginsConfig().get(options);
  let entry = entryConfig().get(options);
  let output = outputConfig().get(options);
  let resolve = resolveConfig().get(options);
  //One comment line
  let devServer = (process.env.NODE_ENV === 'production') ? null : {
    contentBase: './tmp',
    historyApiFallback: true
  };
  return {
    target: 'web',
    cache: 'true',
    entry: entry,
    resolve: resolve,
    output: output,
    module: {
      loaders: commonLoaders.concat(stylesheetLoaders).concat(imagesLoaders)
    },
    plugins: plugins,
    debug: options.debug,
    devtool: options.devtool,
    devServer: devServer
  };
};

export default WebpackConfig;
