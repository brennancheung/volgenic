import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Button, Typography, TextField } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
}))

const Prompt = ({ onSubmit }) => {
  const classes = useStyles({})
  const [value, setValue] = React.useState('')

  const handleChange = e => setValue(e.target.value)

  const handleKeyPress = e => {
    if (e.key !== 'Enter') return
    onSubmit(value)
    setValue('')
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Input
      </Typography>
      <TextField
        label="Command Prompt"
        value={value}
        onChange={handleChange}
        fullWidth
        autoFocus
        onKeyPress={handleKeyPress}
      />
    </Paper>
  )
}

export default Prompt
