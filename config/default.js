module.exports = ({
    //Swagger Config
    Swagger: {
        swaggerApidocs: '/api/v1/api-docs',
        swaggerPath: '/'
    },
    Helmet: {
        noSniff: true,
        xssFilter: true,
        hidePowerBy: true,
        referrerPolicy: { policy: 'same-origin' }
    }
})