import h from 'snabbdom/h'

const onClick = () => {
  console.log('you got clicked')
}

const Counter = ({ i }) => {
  return h('div',
    { on: { click: onClick } },
    `Count: ${i}`
  )
}

export default Counter
