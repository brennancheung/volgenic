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

const Counter = scope => {
  const handleClick = () => {
    scope.i += 1000
  }

  const handleSetServer = () => {
    scope.remoteI = 1234
  }

  const componentDidMount = () => {
    const p = scope.promise.remoteI
    p.then(x => {
      scope.remoteI = x * 5
    })
  }

  return (
    <div
      on-click={handleClick}
      hook-create={componentDidMount}
    >
      Count: {scope.i}
      &nbsp;
      {scope.i < 10 && <ComponentWithInterval key="foo" />}
      <hr />
      <h1>Server Scope:</h1>
      Value: {scope.remoteI}
      <br />
      <button on-click={handleSetServer}>Set server scope</button>
    </div>
  )
}

export default Counter
