import * as React from 'react'
import { Button, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles(theme => ({
  menuButton: { marginRight: theme.spacing(2) },
  title: { flexGrow: 1 },
}))

const Header = () => {
  const classes = useStyles({})

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" className={classes.menuButton}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Category Theory RPN IDE
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
