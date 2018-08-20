/* eslint-disable no-eval, no-unused-vars */
import Snabbdom from 'snabbdom-pragma'
import h from 'snabbdom/h'
import generate from '@babel/generator'
import {
  arrowFunctionExpression,
  assignmentExpression,
  callExpression,
  expressionStatement,
  // exportDefaultDeclaration,
  identifier,
  // jSXClosingElement,
  // jSXElement,
  // jSXIdentifier,
  // jSXOpeningElement,
  // jSXText,
  // numericLiteral,
  memberExpression,
  objectExpression,
  objectProperty,
  program,
  stringLiteral,
  variableDeclaration,
  variableDeclarator,
} from '@babel/types'

window.h = h
window.c = (...args) => console.log(...args)

const Main = scope => {
  const handleClick = () => {
    const body = [
      variableDeclaration(
        'const',
        [
          variableDeclarator(
            identifier('HelloComponent'),
            arrowFunctionExpression(
              [],
              callExpression(
                identifier('h'),
                [
                  stringLiteral('div'),
                  stringLiteral('hello world')
                ]
              )
            )
          )
        ]
      ),
      expressionStatement(
        assignmentExpression(
          '=',
          memberExpression(
            identifier('window'),
            identifier('exports')
          ),
          objectExpression(
            [
              objectProperty(
                identifier('HelloComponent'),
                identifier('HelloComponent')
              )
            ]
          )
        )
      )
    ]
    const ast = program(body)
    const code = generate(ast).code
    scope.generatedCode = code
    eval(code)
    scope.exports = window.exports
  }

  const handleClickOther = () => {
    const body = [
      variableDeclaration(
        'const',
        [
          variableDeclarator(
            identifier('HelloComponent'),
            arrowFunctionExpression(
              [],
              callExpression(
                identifier('h'),
                [
                  stringLiteral('div'),
                  stringLiteral('I am changed')
                ]
              )
            )
          )
        ]
      ),
      expressionStatement(
        assignmentExpression(
          '=',
          memberExpression(
            identifier('window'),
            identifier('exports')
          ),
          objectExpression(
            [
              objectProperty(
                identifier('HelloComponent'),
                identifier('HelloComponent')
              )
            ]
          )
        )
      )
    ]
    const ast = program(body)
    const code = generate(ast).code
    scope.generatedCode = code
    eval(code)
    scope.exports = window.exports
  }

  const nullFn = () => null
  const HelloComponent = scope.exports.HelloComponent || nullFn
  const ret = (
    <div>
      <h1>AST experiment</h1>
      <button on-click={handleClick}>Generate some code</button>
      &nbsp;
      <button on-click={handleClickOther}>Generate some different code</button>
      <h2>Rendered output:</h2>
      <HelloComponent />
      <h2>Generated output:</h2>
      <pre>{scope.generatedCode}</pre>
    </div>
  )
  return ret
}

export default Main
