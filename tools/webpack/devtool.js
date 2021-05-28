const config = {
    development: 'eval-cheap-source-map',
    production : false
};

module.exports = config[global.webpack.env];
