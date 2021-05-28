const {resolve} = require('path');

module.exports = {
    host: 'localhost',
    port: 7600,
    contentBase: [
        resolve(global.webpack.context, 'assets'),
        resolve(global.webpack.context, 'out'),
        resolve(global.webpack.context, '../out'),
    ],
    hot: true,
    disableHostCheck: true,
    inline: false,
    https: false,
    lazy: false,
    quiet: false,
    noInfo: false,
    historyApiFallback: true,
    watchContentBase: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: true,
    },
};
