// Global state object

import Snabbdom from 'snabbdom-pragma'
import createScope from './scope'

const initialValue = {
  screen: 'Modeler',
  componentData: [
    {
      type: 'Paragraph',
      props: [
        {
          type: 'string',
          name: 'contents',
          value: 'Hover over me to see the overlay.'
        }
      ],
    },
    {
      type: 'Heading3',
      props: [
        {
          type: 'string',
          name: 'contents',
          value: 'I am a title'
        }
      ],
    },
  ],
  settings: {},
}

const scope = createScope({
  state: { local: true, initialValue }
})

export default scope
