const {resolve} = require('path');

const environment = {
    // The environment supports arrow functions ('() => { ... }').
    arrowFunction: false,
    // The environment supports BigInt as literal (123n).
    bigIntLiteral: false,
    // The environment supports const and let for variable declarations.
    const: false,
    // The environment supports destructuring ('{ a, b } = obj').
    destructuring: false,
    // The environment supports an async import() function to import EcmaScript modules.
    dynamicImport: false,
    // The environment supports 'for of' iteration ('for (const x of array) { ... }').
    forOf: false,
    // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
    module: false,
};

const result = {
    development: {
        path: resolve(global.webpack.context, '../opencart/admin/view/javascript/rospost/js'),
        publicPath: '/',
        filename: 'rospost.lib.js',
        library: {
            type: 'umd',
        },
        globalObject: 'this',
        environment,
    },
    production: {
        path: resolve(global.webpack.context, 'out'),
        filename: '[name].js',
        chunkFilename: 'js/[name].[contenthash].js',
        publicPath: '',
        library: {
            type: 'umd'
        },
        environment,
    }
};

module.exports = {
    result: result[global.webpack.env],
    environment,
};
