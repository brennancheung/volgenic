import * as React from 'react'
import { Button, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import Header from './Header'
import Stack from './Stack'
import Prompt from './Prompt'
import { lex, Token } from '../lib/lexer'

const useStyles = makeStyles(theme => ({
  root: { flexGrow: 1 },
}))

const Main = () => {
  const [stack, setStack] = React.useState([])
  const classes = useStyles({})

  const handlePromptSubmit = text => {
    const tokens: Token[] = lex(text)
    setStack([...stack, ...tokens])
  }

  return (
    <div className={classes.root}>
      <Header />
      <Stack stack={stack} onChange={setStack} />
      <Prompt onSubmit={handlePromptSubmit} />
    </div>
  )
}

export default Main
