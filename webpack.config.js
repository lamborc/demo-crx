const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

function pathResolve(pathStr){
  return path.resolve(__dirname,pathStr)
}
//common configuration
const commonConfig = {
  target: 'web',
  bail: true,
  output: {
    path: pathResolve('add-on/dist'),
    publicPath:'/dist/bundles/',
    filename:'[name].bundle.js'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          cache:true,
          parallel:true,
          compress: {
            unused:false
          },
          mangle:true
        }
      })
    ]
  },
  plugins: [
    new SimpleProgressWebpackPlugin({
      format:process.env.CI ? 'expanded' : 'minimal'
    }),
    new webpack.DefinePlugin({
      global:'window',
      'process.env': {
        NODE_ENV:'production',
        DEBUG:false
      }
    })
  ],
  module: {
    rules:[
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: ['babel-loader']        
      }
    ]
  },
  resolve: {
    extendsions: ['.js','.json'],
    alias: {
      url: 'iso-url',
      stream: 'readable-stream',
      http: 'http-node', // chrome.sockets
      dns: 'http-dns',//chrome.sockets
      dgram: 'chrome-dgram', // chrome.sockets
      net: 'chrome-net' //chrome.sockets
    }
  },
  node: {
    global: false,
    Buffer:true,
    fs:'empty',
    tls:'empty',
    cluster:'empty'
  },
  watchOptions: {
    ignored:['add-on/dist/**/*','node_modules']
  },
  performance: {
    maxEntrypointSize:Infinity,
    maxAssetSize:4194304 //https://github.com/mozilla/addons-linter/pull/892
  }
}

const bgConfig = merge(commonConfig,{
  name: 'background',
  entry: {
    backgroundPage: './add-on/src/background/background.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors:false,
        default:false

      }
    }
  }
})

const uiConfig = merge(commonConfig,{
  name:'ui',
  entry: {
    browserAction: './add-on/src/popup/browser-action/index.js',
    pageAction:'./add-on/src/popup/page-action/index.js',
    optionsPage:'./add-on/src/options/options.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: false,
        default: false,
        uiCommons: {
          name: 'uiCommons',
          minChunks: 2,
          enforce: true,
          chunks: chunk => chunk.name !== 'backgroundPage'
        }
      }
    }
  }
})

//content scripts injected into tabs
const contentScriptsConfig = merge(commonConfig, {
  name:'contentScripts',
  entry: {
    basProxyContentScriptPayload: './add-on/src/contentScripts/bas-proxy/page.js',
    linkifyContentScript: './add-on/src/contentScripts/linkifyDOM.js',
    normalizeLinksContentScript: './add-on/src/contentScripts/normalizeLinksWithUnhandledProtocols.js'
  }
})


//special content script that injects window.bas into REAL window object
//(by default scripts executed via tabs.executeScript get a sandbox version)
//
const proxyContentScriptConfig = merge(commonConfig,{
  name: 'proxyContentScript',
  dependencies: ['contentScripts'],
  entry: {
    basProxyContentScript: './add-on/src/contentScripts/bas-proxy/content.js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  }
})


module.exports = [
  bgConfig,
  uiConfig,
  contentScriptsConfig,
  proxyContentScriptConfig
]
