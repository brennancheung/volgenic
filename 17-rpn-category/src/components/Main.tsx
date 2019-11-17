import * as React from 'react';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    backgroundColor: '#eee',
  },
}));

const Main = () => {
  const [stack, setStack] = React.useState([]);
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <h1>Stack View</h1>
      <pre>{JSON.stringify(stack, null, 4)}</pre>
      <div>
        <Button variant="contained">Click</Button>
        <input type="text" />
      </div>
    </div>
  );
};

export default Main;
