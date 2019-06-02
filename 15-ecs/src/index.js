let App = require('./App.js').default

App()

if (module.hot) {
  module.hot.accept('./App.js', () => {
    App = require('./App.js').default
    App()
  })
}
