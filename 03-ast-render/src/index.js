import app from './app'

const render = (App) => {
  App()
}

render(app)

if (module.hot) {
  module.hot.accept('./app.js', () => {
    setTimeout(() => {
      const newApp = require('./app.js').default
      render(newApp)
    }, 1)
  })
}