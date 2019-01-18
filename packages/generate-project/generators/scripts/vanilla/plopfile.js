const { resolve, join } = require('path')

module.exports = (plop) => {
  const input = resolve(__dirname, '../../', 'tmp')
  const output = resolve(process.cwd())

  plop.setGenerator('generate', {
    description: 'Vanilla JavaScript project',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the project? (E.g. Bacardi Marketing)'
      },
      {
        type: 'confirm',
        name: 'confirmDir',
        default: false,
        message: `I am going to create your project files in the current directory (${output}). Is this okay?`
      },
      {
        type: 'confirm',
        name: 'confirmGit',
        default: false,
        message: `Last thing, please ensure that this is a valid git repo — as we're going to install githooks... Is it?`
      }
    ],
    actions: [
      {
        type: 'addMany',
        templateFiles: `${input}/**/*`,
        globOptions: { dot: true },
        base: input,
        destination: output
      }
    ]
  })
}
