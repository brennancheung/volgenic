import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Paper,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  table: {
    maxWidth: 1200,
  },
  position: {
    width: 50,
  },
  type: {
    width: 150,
  },
}))

const Stack = ({ stack, onChange }) => {
  const classes = useStyles({})
  return (
    <Paper className={classes.root}>
      <Typography variant="h4">Stack</Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.position}>#</TableCell>
            <TableCell className={classes.type}>Type</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stack.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{stack.length - i - 1}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default Stack
