// Global state object
import createScope from './scope'

const initialValue = {
  screen: 'Modeler',
  settings: {},
}

const scope = createScope({
  state: { local: true, initialValue }
})

export default scope
