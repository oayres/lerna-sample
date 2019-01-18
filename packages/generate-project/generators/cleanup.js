const { join } = require('path')
const { promisify } = require('util')
const rimraf = promisify(require('rimraf'))

module.exports = async () => {
  try {
    const tmp = join(__dirname, 'tmp')
    await rimraf(tmp)
  } catch (error) {
    console.warn('Failed to cleanup!', error)
    process.exit(1)
  }
}
