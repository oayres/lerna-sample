#!/usr/bin/env node

const prodConfig = require('./configs/production')
const devConfig = require('./configs/development')
const errorStyles = require('./error-styles')
const baseConfig = require('./configs/base')
const isEmpty = require('lodash.isempty')
const merge = require('webpack-merge')
const argv = require('yargs').argv
const webpack = require('webpack')
const kleur = require('kleur')
const path = require('path')

const pe = require('pretty-error').start()
pe.appendStyle(errorStyles)

const logError = (str, error) => {
  console.log(`${kleur.bold.white.bgRed(' ' + str + ' ')} \n`)
  if (error) console.log(error)
}

const logInfo = (str) => {
  console.info(`${kleur.bold.white.bgBlue(' ' + str + ' ')} \n`)
}

const mergeConfigs = (rootPath, mmtConfig, mmtWebpackConfigExtensions, env, argv) => {
  const isProd = env === 'production'

  // Simple config info passed in, like entry and output...
  const configurableConfigValues = configurableWebpackValues(rootPath, mmtConfig, argv)

  // Full extensions to the webpack config
  const { webpackDev, webpackProd } = mmtWebpackConfigExtensions
  const mmtExtensions = isProd ? webpackProd : webpackDev

  // Dev or prod-specific config from this package
  const config = isProd ? prodConfig : devConfig

  const mergedConfig = merge(
    baseConfig(configurableConfigValues, mmtConfig),
    config,
    configurableConfigValues,
    mmtExtensions
  )

  if (mmtConfig.verbose || isProd) {
    console.log('Building with the following webpack config', JSON.stringify(mergedConfig, null, 2))
  }
  return mergedConfig
}

const configurableWebpackValues = (rootPath, { entry, output = 'build' }, argv) => {
  const entryPathRelativeToProject = path.resolve(rootPath, entry)
  const outputPathRelativeToProject = path.resolve(rootPath, output, 'assets')

  return {
    entry: entryPathRelativeToProject,
    watch: !argv.dev && !argv.prod,
    output: {
      path: outputPathRelativeToProject,
      publicPath: './assets/'
    }
  }
}

const webpackCallback = (error, stats, mmtConfig) => {
  if (mmtConfig.verbose) console.log(stats)
  if (error) logError('An error occurred in your mmt-webpack build', error)
}

const start = async () => {
  let mmtConfig
  let webpackConfig
  const rootPath = process.cwd()
  const env = argv.prod ? 'production' : 'development'

  try {
    mmtConfig = require(`${rootPath}/config/mmt.config.js`)
  } catch (error) {
    logError('There was a problem with your config file — config/mmt.config.js', error)
    return
  }

  if (!mmtConfig.entry) {
    logError('You must provide at least an `entry` property in your `mmt.config.js` file')
    return
  }

  const mmtWebpackConfigExtensions = require(`${rootPath}/config/extends.js`)

  try {
    webpackConfig = mergeConfigs(rootPath, mmtConfig, mmtWebpackConfigExtensions, env, argv)
  } catch (error) {
    logError('There was an error merging configs', error)
    return
  }

  try {
    webpack(
      webpackConfig,
      (error, stats) => webpackCallback(error, stats, mmtConfig)
    )
  } catch (error) {
    logError('An error occurred in your mmt-webpack build', error)
    return
  }
}

start()
