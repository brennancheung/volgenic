// Global state object
import createScope from './scope'

const initialValue = {
  screen: 'Modeler',
  componentData: [
    { type: 'Paragraph', contents: 'Hover over me to see the overlay.' }
  ],
  settings: {},
}

const scope = createScope({
  state: { local: true, initialValue }
})

export default scope
