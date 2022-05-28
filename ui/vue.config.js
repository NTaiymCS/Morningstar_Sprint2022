module.exports = {
    lintOnSave: 'warning',
    publicPath: '',
    runtimeCompiler: true,
    css: {
        requireModuleExtension: false,
        loaderOptions: {
            sass: {
                // options here will be passed to css-loader
                additionalData: `@import "~@mds/constants"; $mds-font-asset-path: "~@mds/fonts/src/"; @import "~@mds/typography";`
            },
            css: {
                // customize generated class names
                modules: {
                    localIdentName: '[local]__pp'
                },
                esModule: false
            }
        }
    },
    chainWebpack: (config) => {
        config.module
            .rule("images")
            .use("url-loader")
            .loader("url-loader")
            .tap((options) => {
                options.fallback.options.name = "assets/[name].[ext]"
                return options
            })
    },
    configureWebpack: {
        optimization: {
            runtimeChunk: 'single',
            splitChunks: false,
        },
        module: {
            rules: [{
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: i => /node_modules/.test(i) && !/(@mds|morningstar-design-system|ec-mwc-component-helper)/.test(i),
                    options: {
                        plugins: ['lodash'],
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        ie: '11',
                                    },
                                    useBuiltIns: 'usage',
                                    corejs: 3,
                                },
                            ],
                        ],
                    },
                },
                {
                    // Additional loader to load font files, probably also needed to load images/icons for other components
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                    loader: 'file-loader',
                },
            ],
        }
    },
}

