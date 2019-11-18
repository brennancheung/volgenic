import { isNumeric } from './util'

const lexer = () => {}

const tokString = str => {
  type: 'string'
  value: str
}

export type Token =
  | { type: 'word'; value: string }
  | { type: 'number'; value: number }
  | { type: 'boolean'; value: boolean }
  | { type: 'string'; value: string }

export const toToken = (input: string): Token => {
  if (input === 'true') {
    return { type: 'boolean', value: true }
  }
  if (input === 'false') {
    return { type: 'boolean', value: false }
  }
  if (isNumeric(input)) {
    return { type: 'number', value: Number(input) }
  }
  return { type: 'word', value: input }
}

export const isWhitespace = (ch: string): boolean => /\s/.test(ch)

export const lex = (input: string): Token[] => {
  let tokens: Token[] = []

  type StateType = 'token' | 'string' | 'whitespace'
  let state: StateType = 'whitespace'
  let accum: string = ''

  // Append an additional space to eliminate the need for an EOL character
  let padded = `${input} `

  padded.split('').forEach(ch => {
    switch (state) {
      case 'token': {
        if (isWhitespace(ch)) {
          tokens.push(toToken(accum))
          accum = ''
          state = 'whitespace'
          break
        }
        accum += ch
        break
      }

      case 'whitespace': {
        if (isWhitespace(ch)) break
        if (ch === '"') {
          state = 'string'
          accum = ''
          break
        }
        state = 'token'
        accum = ch
        break
      }

      case 'string': {
        if (ch === '"') {
          tokens.push({ type: 'string', value: accum })
          accum = ''
          state = 'whitespace'
          break
        }
        accum += ch
        break
      }
    }
  })

  return tokens
}
