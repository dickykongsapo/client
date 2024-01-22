const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '.', dir);
}

module.exports = function override(config) {
    config.resolve.alias = {
        ...config.resolve.alias,
        '@': resolve('src'),
        '@app': resolve('src/app'),
        '@assets': resolve('src/assets'),
        '@models': resolve('src/models'),
        '@pages': resolve('src/pages'),
        '@components': resolve('src/components'),
        '@services': resolve('src/services'),
        '@styles': resolve('src/styles'),
        '@store': resolve('src/store'),
        '@home': resolve('src/app/modules/home'),
        '@shared': resolve('src/app/shared')
    };
    config.plugin
    // config.resolve.fallback = {
    //     ...config.resolve.fallpack,

    //     crypto: require.resolve('crypto-browserify'),
    // }

    return config;
}
