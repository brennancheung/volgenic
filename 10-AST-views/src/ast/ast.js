import {
  DOM,
  SCOPE_ACCESSOR,
  STRING_CONCAT,
  STRING_LITERAL,
} from './ast_constants'

export const scope_accessor = key => ({ type: SCOPE_ACCESSOR, key })
export const string_concat = (...values) => ({ type: STRING_CONCAT, value: [...values] })
export const string_literal = value => ({ type: STRING_LITERAL, value })
export const div = (...children) => ({ type: DOM, tag: 'div', children })
export const stream = value => ({ type: STREAM, value })

export const cast_string = node => {
  return ({ type: 'STRING_LITERAL', value: `${node.value}` })
}

export function parseAST (ast, context={}) {
  switch (ast.type) {
    case DOM: {
      const node = {}
      return node
    }

    case STRING_CONCAT: {
      let str = ''
      ast.value.forEach(node => {
        if (node.type === STRING_LITERAL) {
          str += node.value
        } else {
          str += cast_string(parseAST(node, context)).value
        }
      })
      return { type: 'STRING_LITERAL', value: str }
    }


    case SCOPE_ACCESSOR: {
      const dict = context.symbolTable || {}
      return dict[ast.key]
    }

    default:
      throw new Error('Unknown AST type: ' + JSON.stringify(ast))
  }
}

