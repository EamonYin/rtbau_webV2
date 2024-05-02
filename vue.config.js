const { defineConfig } = require('@vue/cli-service')
module.exports = {
  transpileDependencies: true,
  lintOnSave:false,
  // assetsDir: 'static',
  // parallel: false,
  // publicPath: './',
// devServer: {
//   proxy: {
//     '/api': {
//         target: 'http://192.168.1.11:8090/practice/api', //API服务器的地址
//         changeOrigin: true,
//         pathRewrite: {
//             '^/api': ''
//         }
//     }
// }
// }
}

// module.exports = {
//   devServer: {
//     proxy: {
//       '/api':{              // /api 表示拦截以/api开头的请求路径
//         target:'124.221.68.138:5539/practice',     // 跨域的域名（不需要写路径）
//         // ws：true,        // 是否代理websocked
//         changeOrigin: true, // 是否开启跨域
//         // pathRewrite:{       // 重写路径
//         //   '^/api': ''       //把api变为空字符
//         // }
//       },
//     }
//   }
// }

