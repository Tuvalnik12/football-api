import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 5),
    margin: '2%'
  },
}));

export default function CurrentChoice({ league, fixture, area }) {
  const classes = useStyles();

  return (
    <div style={{
    	display: 'flex',
    	justifyContent: 'center'
    }}>
		<Paper className={classes.root}>
			<Typography variant="h6" component="h3">
			   {league} - {area}
			</Typography>
		</Paper>
		<Paper className={classes.root}>
			<Typography variant="h6" component="h3">
			  Fixture - {fixture}
			</Typography>
		</Paper>
		   
    </div>
  );
}