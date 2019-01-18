const updateNotifier = require('update-notifier')
const pkg = require('./package.json')

const notify = () => {
  const notifier = updateNotifier({ pkg })

  if (notifier.update) {
    console.log('The mmt package is out of date! Please update with: npm install -g mmt')
    process.exit(1)
  }
}

module.exports = notify
