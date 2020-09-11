module.exports = {
    configureWebpack: (config) => {
        Object.assign(config, {
            externals:[
                require('webpack-require-http')
            ]
        })
    },
    runtimeCompiler: true,
}