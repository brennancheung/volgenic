import { lex, toToken, isWhitespace } from '../lexer'

describe('toToken', () => {
  it('processes numbers', () => {
    expect(toToken('123')).toEqual({ type: 'number', value: 123 })
    expect(toToken('123.456')).toEqual({ type: 'number', value: 123.456 })
  })

  it('processes strings', () => {
    expect(toToken('foo')).toEqual({ type: 'word', value: 'foo' })
  })
})

describe('lexer', () => {
  it('processes a mix of things', () => {
    const tokens = lex('test foo 123 4.5 true false')
    expect(tokens).toEqual([
      { type: 'word', value: 'test' },
      { type: 'word', value: 'foo' },
      { type: 'number', value: 123 },
      { type: 'number', value: 4.5 },
      { type: 'boolean', value: true },
      { type: 'boolean', value: false },
    ])
  })

  it('handles string processing', () => {
    const tokens = lex('123 "this is a string" true')
    expect(tokens).toEqual([
      { type: 'number', value: 123 },
      { type: 'string', value: 'this is a string' },
      { type: 'boolean', value: true },
    ])
  })
})

describe('isWhitespace', () => {
  it('detects whitespace correctly', () => {
    expect(isWhitespace(' ')).toEqual(true)
    expect(isWhitespace('\t')).toEqual(true)
    expect(isWhitespace('\n')).toEqual(true)
    expect(isWhitespace('f')).toEqual(false)
  })
})
