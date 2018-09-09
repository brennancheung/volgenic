/* eslint-disable no-eval, no-unused-vars */
import Snabbdom from 'snabbdom-pragma'
import h from 'snabbdom/h'
import generate from '@babel/generator'
import uuid from 'uuid'

import { intersperseBetween } from './fp'

import body1 from './babelAst1'
import body2 from './babelAst2'

import exampleAST from './exampleAST'

window.h = h
window.c = (...args) => console.log(...args)

const JSONView = ({ json }) => <pre>{JSON.stringify(json, null, 4)}</pre>

// This works when it is a tree.  What about when it is a graph?
const cursor = [ 'children', 1, 'children', 0 ]
const cursorWalker = (ast, cursor, fn) => {
  fn(ast)
  const [head, ...tail] = cursor
  if (head !== undefined) {
    if (typeof head === 'string' || Number.isFinite(head)) {
      cursorWalker(ast[head], tail, fn)
    }
  }
}

const cursorBreadcrumbs = (node, cursor) => {
  let crumbs = []
  cursorWalker(node, cursor, root => {
    if (root.type === 'DOM') {
      crumbs.push(root.tag)
    } else if (root instanceof Array) {
      // skip it for now, the array is not a node
    }
  })
  return crumbs
}

const ASTBreadcrumbs = ({ root, cursor }) => {
  const crumbs = cursorBreadcrumbs(root, cursor)
  const crumbSpans = crumbs.map(x => <span>{x}</span>)
  const interwovenCrumbs = intersperseBetween(crumbSpans, ' > ')
  return (
    <div>
      {interwovenCrumbs}
    </div>
  )
}

const Main = scope => {
  const handleClick = () => {
    const ast = body1
    const code = generate(ast).code
    scope.generatedCode = code
    eval(code)
    scope.exports = window.exports
  }

  const handleClickOther = () => {
    const ast = body2
    const code = generate(ast).code
    scope.generatedCode = code
    eval(code)
    scope.exports = window.exports
  }

  const nullFn = () => null
  const HelloComponent = scope.exports.HelloComponent || nullFn
  const ret = (
    <div>
      <h1>AST Editor</h1>

      <h2>Breadcrumb view</h2>
      <ASTBreadcrumbs
        root={exampleAST}
        cursor={cursor}
      />

      <h2>JSON view</h2>
      <JSONView json={exampleAST} />

      <h2>Outline view</h2>

      <h2>Rendered output:</h2>

      <h2>Generated output:</h2>
      <pre>{scope.generatedCode}</pre>
    </div>
  )
  return ret
}

export default Main
