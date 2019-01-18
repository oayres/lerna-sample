const { exec } = require('child_process')
const ora = require('ora')
const kleur = require('kleur')

/**
 * It's worth noting that I'm using exec here. This
 * does not stream the logs to the console "live". If
 * this needs to be changed in the future — an option could
 * be "spawn": https://stackoverflow.com/questions/10232192/exec-display-stdout-live
 */

const installSuccess = (stdout, spinner, resolve) => {
  // console.log(stdout) // Success output of NPM. Hidden for neatness
  spinner.succeed('npm packages installed successfully!')
  resolve()
}

const installFail = (error, spinner, promise) => {
  console.error(error)
  spinner.fail('Failed to install npm packages!')
  reject()
  process.exit(1)
}

const installDeps = () => {
  return new Promise((resolve, reject) => {
    const spinner = ora(kleur.bold.yellow('Installing required npm packages, this could take some time...'))
    spinner.color = 'yellow'
    spinner.start()

    const opts = {
      cwd: process.cwd(),
      maxBuffer: 200 * 1024
    }

    exec('npm install', opts, (error, stdout, stderr) => {
      if (error) installFail(error, spinner, reject)
      installSuccess(stdout, spinner, resolve)
    })
  })
}

module.exports = installDeps
