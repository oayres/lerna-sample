#!/usr/bin/env node

const inquirer = require('inquirer')
const kleur = require('kleur')
const notify = require('./notify')
const constants = require('./constants')
const clear = require('clear')
const generateVanilla = require('./generators/scripts/vanilla')

const {
  vanilla,
  reactClient,
  reactNode,
  nodeApi
 } = constants

const comingSoon = () => {
  console.info(kleur.bgMagenta.bold.white('\n\n This is coming soon, promise!! Until that time, please ask anyone from the Front-end Group to help out \n\n'))
  process.exit(1)
}

const processAnswers = ({ chosenTodo }) => {
  const actions = {
    [vanilla]: generateVanilla,
    [reactClient]: comingSoon,
    [reactNode]: comingSoon,
    [nodeApi]: comingSoon
  }

  actions[chosenTodo]()
}

const askQuestions = () => {
  inquirer.prompt([{
    type: 'list',
    name: 'chosenTodo',
    message: 'What would you like to do today?',
    choices: [
      {
        name: 'Generate a vanilla front-end project',
        value: vanilla
      },
      {
        name: 'Generate a client-side React project',
        value: reactClient
      },
      {
        name: 'Generate a Node and React project',
        value: reactNode
      },
      {
        name: 'Generate a Node API',
        value: nodeApi
      }
    ]
    }
  ])
  .then(processAnswers)
}

const start = () => {
  clear()
  notify()
  console.info(`\n ${kleur.bold.white.bgBlue(' ' + 'Welcome to the MMT Digital project generator' + ' ')} \n`)
  askQuestions()
}

start()
