// module.exports = {
//   // 以下是pwa配置
//   pwa: {
//     iconPaths: {
//       favicon32: 'github.ico',
//       favicon16: 'github.ico',
//       appleTouchIcon: 'github.ico',
//       maskIcon: 'github.ico',
//       msTileImage: 'github.ico'
//     }
//   },
//   configureWebpack: config => {
//     config.externals = {
//       vue: 'Vue',
//       'vue-router': 'VueRouter',
//       "highlight.js": "hljs",
//       lodash: {
//         commonjs: 'lodash',
//         umd: 'lodash',
//         root: '_'
//       }
//     };
//   }
// };
// const BundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

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
  configureWebpack: {
    externals: {
      'highlight.js': 'hljs'
    }
    // plugins: [new BundleAnalyzer()]
  },
  chainWebpack: config => {
    config.optimization.splitChunks({
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        },
        elementUi: {
          name: 'elementUi',
          test: /[\\/]node_modules[\\/](element-ui)[\\/]/,
          chunks: 'all'
        },
        moment: {
          name: 'moment',
          test: /[\\/]node_modules[\\/](moment)[\\/]/,
          chunks: 'all'
        },
        coreJs: {
          name: 'coreJs',
          test: /[\\/]node_modules[\\/](core-js)[\\/]/,
          chunks: 'all'
        },
        marked: {
          name: 'marked',
          test: /[\\/]node_modules[\\/](marked)[\\/]/,
          chunks: 'all'
        },
        axios: {
          name: 'axios',
          test: /[\\/]node_modules[\\/](axios)[\\/]/,
          chunks: 'all'
        }
      }
    });
  }
};
