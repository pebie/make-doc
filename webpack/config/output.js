/**
 * Created by bouchez on 31/07/15.
 */
import path from 'path';
import process from 'process';

module.exports = () => {
  let outputDir = (process.env.NODE_ENV === 'production') ? './server/client' : 'tmp';
  return {
    get: ()=> {
      return {
        path: path.join(process.cwd(), outputDir),
        publicPath: '/',
        filename: '[name].js',
        library: ['Example', '[name]'],
        pathInfo: true
      };
    }
  };
};
