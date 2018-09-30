import React from 'react'
import PropTypes from 'prop-types'
import produceImmer from 'immer'

const Context = React.createContext({})
export const Consumer = Context.Consumer
export const Provider = Context.Provider

class AppContext extends React.Component {
  state = {
    ...this.props.initialContext,

    setContext: (...args) => {
      this.setState(...args)
      setImmediate(() => { window.context = this.state })
    },

    mutate: (...args) => {
      const combined = [
        // Arg 1: The original state
        this.state,

        // Arg 2: mutation function, e.g., draft => { draft.xyz = 123 }
        ...args,

        // Arg 3: Middleware for processing mutation ops
        (patches, inversePatches) => {
          // TODO: patches can be used to dispatch state changes to the server
          // Patches take the form:
          // { op: 'replace', path: ['count'], value: 5 }
        }
      ]
      this.setState(produceImmer(...combined))
    },
  }

  componentDidMount () {
    window.context = this.state
    window.setContext = this.state.setContext
  }

  render () {
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    )
  }
}

AppContext.propTypes = {
  initialContext: PropTypes.object,
}

AppContext.defaultProps = {
  initialContext: {},
}

export const withAppContext = Component => props => (
  <Consumer>
    {
      ({ setContext, mutate, ...rest }) =>
        <Component
          {...props}
          setContext={setContext}
          context={rest}
          mutate={mutate}
        />
    }
  </Consumer>
)

export default AppContext
