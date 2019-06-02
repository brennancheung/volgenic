import app from './app'

const body = document.querySelector('body')
body.innerHTML = ''
const appDiv = document.createElement('div')
appDiv.setAttribute('id', 'app')
body.appendChild(appDiv)
app(appDiv)
