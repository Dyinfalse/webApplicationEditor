const path = require("path");

module.exports = {
    configureWebpack: (config) => {
        Object.assign(config, {
            externals:[
                require('webpack-require-http')
            ]
        })
    },

    // 第三方插件配置
    pluginOptions: {
        "style-resources-loader": {
        preProcessor: "less",
        patterns: [path.resolve(__dirname, "./src/theme/index.less")],
        },
    },
    runtimeCompiler: true,
}