const {resolve} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
    global.webpack = {
        context: resolve(__dirname, '../../'),
        dir: __dirname,
        env: process.env.NODE_ENV,
        config: process.env.CONFIG,
        development: process.env.NODE_ENV === 'development',
        production: process.env.NODE_ENV === 'production',
        enableStyleLoader: true,
    };

    const config = {
        context: global.webpack.context,
        mode: global.webpack.env,
        entry: {
            module: 'src/module.tsx'
        },
        devtool: require('./devtool'),
        resolve: {
            alias: {'src': resolve(__dirname, `../../src`)},
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.css'],
            modules: [
                'node_modules',
                'src'
            ]
        },
        target: 'web',
        output: require('./output').result,
        optimization: require('./optimization'),
        module: {
            rules: [
                {
                    test: /\.[tj]sx?$/,
                    include: [
                        resolve(global.webpack.context, 'src'),
                    ],
                    exclude: [
                        resolve(global.webpack.context, 'out'),
                    ],
                    use: [
                        {
                            loader: 'babel-loader'
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                                compilerOptions: {
                                    sourceMap: global.webpack.development
                                }
                            }
                        },
                    ]
                },
                {
                    test: /\.(scss)$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.(p?css)$/,
                    include: [
                        resolve(global.webpack.context, 'src'),
                    ],
                    use: [
                        (
                            global.webpack.enableStyleLoader ?
                                {
                                    loader: 'style-loader', // creates style nodes in DOM from JS strings,
                                    options: {
                                        attributes: {
                                            'data-style': 'styles'
                                        },
                                    },
                                } :
                                {
                                    loader: MiniCssExtractPlugin.loader,
                                    options: {
                                        esModule: false,
                                    },
                                }
                        ),
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: global.webpack.development,
                                modules: {
                                    localIdentName: global.webpack.production ? '[local]__[hash:base64]' : '[local]__[path][name]',
                                }
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        'postcss-nested',
                                        'autoprefixer',
                                        'postcss-import',
                                        'postcss-css-variables'
                                    ]
                                }
                            }
                        },
                    ]
                },
                {
                    test: /\.less$/,
                    include: [
                        resolve(global.webpack.context, 'src'),
                        resolve(global.webpack.context, 'node_modules'),
                    ],
                    use: [
                        (
                            global.webpack.enableStyleLoader ?
                                {
                                    loader: 'style-loader', // creates style nodes in DOM from JS strings,
                                    options: {
                                        attributes: {
                                            'data-style': 'styles'
                                        },
                                    },
                                } :
                                {
                                    loader: MiniCssExtractPlugin.loader,
                                    options: {
                                        esModule: false,
                                    },
                                }
                        ),
                        {
                            loader: 'css-loader', // translates CSS into CommonJS
                            options: {
                                sourceMap: global.webpack.development,
                                modules: {
                                    localIdentName: global.webpack.production ? '[local]__[hash:base64]' : '[local]__[path][name]',
                                },
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        'postcss-nested',
                                        'autoprefixer',
                                        'postcss-import',
                                        'postcss-css-variables'
                                    ]
                                }
                            }
                        },
                        {
                            loader: 'less-loader', // compiles Less to CSS
                            options: {
                                sourceMap: global.webpack.development,
                            },
                        },
                    ]
                },
                {
                    test: /\.css$/,
                    include: [
                        resolve(global.webpack.context, 'src'),
                        resolve(global.webpack.context, 'node_modules'),
                    ],
                    use: [
                        {
                            loader: 'style-loader', // creates style nodes in DOM from JS strings,
                            options: {
                                attributes: {
                                    'data-style': 'styles'
                                },
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: global.webpack.development,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: require('./plugins'),
        performance: {hints: global.webpack.development ? false : 'warning'},
        bail: global.webpack.production,
        profile: global.webpack.production,
        externals: ['fs'],
        stats: {children: false}
    }

    if (global.webpack.development) {
        config.devServer = require('./devServer');
    }

    return config;
}
