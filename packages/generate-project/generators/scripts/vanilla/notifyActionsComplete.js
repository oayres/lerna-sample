const { exec } = require('child_process')
const ora = require('ora')
const kleur = require('kleur')

const notifyActionsComplete = () => {
  // This is a bit naughty. It's kind of a fake loading spinner.
  // At some point, we could hook this into the plop actions
  // to detect whether it's failed or succeeded...

  const spinner = ora(kleur.bold.yellow('Creating project files...'))
  spinner.color = 'yellow'
  spinner.start()
  setTimeout(() => spinner.succeed('Project files created!'), 1000)
}

module.exports = notifyActionsComplete
