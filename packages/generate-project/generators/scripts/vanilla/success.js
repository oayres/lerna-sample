const { exec } = require('child_process')
const ora = require('ora')
const kleur = require('kleur')

const success = () => {
  console.log(
    kleur.bold.yellow(
    `

    Setup complete.

    →  To start the dev build in watch mode: ${kleur.white('npm start')}
    →  To build for production: ${kleur.white('npm run build:prod')}

    For more information, please head to http://docs.mmt.digital

    Enjoy!


    `
    )
  )
}

module.exports = success
