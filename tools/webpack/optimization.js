const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
    development: {
        moduleIds: 'named',
        chunkIds: 'named',
    },
    production: {
        chunkIds: 'deterministic',
        moduleIds: 'deterministic',
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                    compress: {
                        pure_funcs: [
                            'console.log',
                            'console.debug',
                        ],
                    },
                },
                extractComments: false,
            }),
            new CssMinimizerPlugin(
                {
                    minimizerOptions: {
                        preset: [
                            'default',
                            {
                                discardComments: {
                                    removeAll: true,
                                },
                            },
                        ],
                    },
                }
            )
        ]
    }
}

module.exports = config[global.webpack.env];
