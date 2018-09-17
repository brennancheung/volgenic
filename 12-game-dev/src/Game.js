// Global game state object
import createScope from './scope'

const initialValue = {
  screen: 'NewGame',
  settings: {},
}

const scope = createScope({
  state: { local: true, initialValue }
})

export default scope
