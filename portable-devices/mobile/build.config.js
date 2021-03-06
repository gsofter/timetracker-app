const config = {
    __SERVER__: false,
    __CLIENT__: true,
    __SSR__: false,
    __DEBUGGING__: false,
    __TEST__: false,
    __API_URL__: process.env.API_URL || 'http://localhost:8091/graphql',
    __WEBSITE_URL__: process.env.WEBSITE_URL || 'http://localhost:8091'
}

module.exports = config;
