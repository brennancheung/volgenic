import Snabbdom from 'snabbdom-pragma'

const ComponentWithInterval = (scope) => {
  const handlers = {
    timer: null,

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
      Can't stop setInterval
    </div>
  )
}

const Counter = scope => {
  const handleClick = () => scope.i++

  const Count = () => <span>{scope.i}</span>

  return (
    <div
      on-click={handleClick}
    >
      Count: <Count />
      &nbsp;
      {scope.i < 10 && <ComponentWithInterval key="foo" />}
    </div>
  )
}

export default Counter
