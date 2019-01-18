const processPrompts = (prompts) => {
  const { confirmDir, confirmGit, name } = prompts
  return new Promise((resolve, reject) => {
    if (!name) {
      reject(`We need a name... Nothing was created`)
    }
    if (!confirmDir || !confirmGit) {
      reject(`Your responses say that you're not quite ready to create files yet. Nothing was created`)
    }
    resolve()
  })
}

module.exports = processPrompts
