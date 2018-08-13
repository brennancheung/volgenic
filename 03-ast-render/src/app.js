import {
  DOM,
} from './ast/ast_constants'

import Stream from './Stream'

import {
  div,
  parseAST,
  scope_accessor,
  stream,
  string_concat,
  string_literal,
} from './ast/ast'

const num$ = new Stream(123)
num$.subscribe(x => console.log(x))
setInterval(() => { num$.value += 1 }, 1000)

const ast =
  div(
    string_concat(
      string_literal('Hello from '),
      scope_accessor('greeter'),
      string_literal(', count: '),
      stream(num$)
    )
  )

const scope = {
  symbolTable: {
    'greeter': string_literal('Brennan')
  }
}

function render (node, container) {
  const element = parseAST(node, scope)
  container.innerHTML = ''
  container.append(element)
}

const app = () => {
  const body = document.querySelector('body')
  render(ast, body)
}

export default app
