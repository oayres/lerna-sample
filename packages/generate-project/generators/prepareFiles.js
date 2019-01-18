const { join, resolve } = require('path')
const makeDir = require('make-dir')
const { promisify } = require('util')
const recursiveCopy = require('recursive-copy')

const copyFiles = promisify(recursiveCopy)

const prepareFiles = async (generatorName) => {
  try {
    const dirToMake = join(__dirname, 'tmp')
    const tmpDir = await makeDir(dirToMake)

    const sharedTemplates = resolve(__dirname, 'templates', 'shared')
    const generatorTemplates = resolve(__dirname, 'templates', generatorName)

    await copyFiles(sharedTemplates, tmpDir, { dot: true })
    await copyFiles(generatorTemplates, tmpDir,  { dot: true })
  } catch (error) {
    console.warn('Failed to prepare files!', error)
    process.exit(1)
  }
}

module.exports = prepareFiles
