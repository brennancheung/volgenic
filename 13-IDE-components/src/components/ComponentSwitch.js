import Snabbdom from 'snabbdom-pragma'

const ComponentSwitch = ({ data }) => {
  const { type, props } = data
  switch (type) {
    case 'Paragraph':
      return <p>{props[0].value}</p>

    case 'Heading3':
      return <h3>{props[0].value}</h3>
  }
}

export default ComponentSwitch
