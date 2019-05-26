const Encore = require('@symfony/webpack-encore')
const babelEnvDeps = require('webpack-babel-env-deps')

//This shouldn't be necessary
var env = process.argv.includes('--release') ? 'prod' : 'dev'

Encore
    .configureRuntimeEnvironment(env)
    .setOutputPath('./dist/')
    .setPublicPath('/dist')
    .addEntry('vendor', [
            './Styles/parentStyle.css',
            'event-source-polyfill',
            'isomorphic-fetch',
            'vue'
        ])
    .addEntry('app', ['babel-polyfill','./src/app.js'])
    .configureBabel(()=>{}, {exclude: babelEnvDeps.exclude()})
    .cleanupOutputBeforeBuild(['*.js', '*.css', '*.map'])
    .disableSingleRuntimeChunk()
    .enableSourceMaps(!Encore.isProduction())
    .enableVueLoader(function(options) {
        options.preLoader = {
            productionMode: Encore.isProduction()
        }
    })
    .enableSassLoader()


var config = Encore.getWebpackConfig()
if(Encore.isProduction()) {
    config.resolve.alias = {
        vue: 'vue/dist/vue.min.js'
    }
}

module.exports = config