import { DOM } from './ast/ast_constants'

// {h('h1', { on: { click: () => console.log('clicked') } }, 'testing')}

export const dom = (tag, ...args) => {
  const params = {}
  args.forEach(arg => {
    if (typeof arg === 'string') {
      params.text = arg
    } else if (arg instanceof Array) {
      params.children = arg
    } else if (arg instanceof Object) {
      params.attrs = arg
    }
  })

  return {
    type: DOM,
    tag,
    attrs: params.attr,
    text: params.text,
    children: params.children,
  }
}

export const h1 = (...args) => dom('h1', ...args)
export const div = (...args) => dom('div', ...args)
export const span = (...args) => dom('span', ...args)

const ast =
  div({ id: 'main' }, [
    h1({}, 'Header'),
    div([
      span('testing')
    ]),
  ])

export default ast
