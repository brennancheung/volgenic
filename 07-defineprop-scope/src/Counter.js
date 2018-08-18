/* eslint-disable no-unused-vars */
import Snabbdom from 'snabbdom-pragma'

const ComponentWithInterval = (scope) => {
  const handlers = {
    onCreate (_, vnode) {
      console.log('onCreate')
      vnode.elm.timer = setInterval(
        () => { console.log('I am here') },
        100
      )
    },

    onDestroy (vnode) {
      console.log('onDestroy')
      clearInterval(vnode.elm.timer)
    }
  }

  return (
    <div
      key={scope.key}
      hook-create={handlers.onCreate}
      hook-destroy={handlers.onDestroy}
    >
      Interval Timer rendered
    </div>
  )
}

const Counter = async scope => {
  const handleClick = () => {
    scope.i += 1000
  }

  const handleSetServer = async () => {
    console.log('start setting server')
    const y = (scope.remoteI = 1234)
    console.log('y = ', y)
    console.log('finished setting server')
  }

  return (
    <div on-click={handleClick} >
      Count: {scope.i}
      &nbsp;
      {scope.i < 10 && <ComponentWithInterval key="foo" />}
      <hr />
      <h1>Server Scope:</h1>
      <button on-click={handleSetServer}>Set server scope</button>
      {await scope.remoteI}
    </div>
  )
}

export default Counter
