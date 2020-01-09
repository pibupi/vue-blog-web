module.exports = {
  // 以下是pwa配置
  pwa: {
    iconPaths: {
      favicon32: 'github.ico',
      favicon16: 'github.ico',
      appleTouchIcon: 'github.ico',
      maskIcon: 'github.ico',
      msTileImage: 'github.ico'
    }
  },
  configureWebpack: config => {
    config.externals = {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      lodash: {
        commonjs: 'lodash',
        umd: 'lodash',
        root: '_'
      }
    };
  }
};
