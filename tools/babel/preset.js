module.exports = function (api) {
    return {
        presets: [
            [
                '@babel/env',
                {
                    useBuiltIns: 'usage',
                    corejs: {
                        version: 3,
                        proposals: true
                    },
                    targets: {
                        chrome: '59',
                        //edge: '0',
                        safari: '10',
                        firefox: '50',
                        //ie: '11',
                    },
                    debug: api.env('dev')
                }
            ],
            ['@babel/react', {
                "runtime": "automatic"
            }],
        ],
        plugins: [],
        sourceType: 'unambiguous',
    };
}
