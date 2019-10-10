import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    justifyContent: 'center',
    textAlign: 'center',
    margin: '1%',
    padding: "1em"
  },
});

export default function GameCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
      {props.homeTeam} - {props.awayTeam}
        </Typography>
      </CardContent>
{/*      <CardActions 
      style={{
        justifyContent: 'center'
      }}>
        <Button 
        size="small"
        >Learn More</Button>
      </CardActions>
*/}    </Card>
  );
}