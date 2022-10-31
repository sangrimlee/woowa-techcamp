import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../../webpack.config';

const webpackMiddleware = webpackDevMiddleware(webpack(config), {
  publicPath: config.output.publicPath,
});

export default webpackMiddleware;
