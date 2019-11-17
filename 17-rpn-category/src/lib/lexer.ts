const lexer = () => {};

interface IToken {
  type: string;
  value: any;
}

type TokenType = String | Number | Function;

/*
function determineType(input: String): TokenType {
  if (input)
}

function lex(input: string): IToken[] {
  let tokens:IToken[] = []

  // Crude language implementation for now that is just tokens split by spaces
  input.split(' ').forEach(part => {
    tokens.push()
  })
}
*/
