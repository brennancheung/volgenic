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

export default program(body)
