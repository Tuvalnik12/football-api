import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "./CurrentChoice.css";

export default function CurrentChoice({ league, fixture, area }) {
  return (
    <div className="current-choice__container">
      <Button
          color="primary"
          className="button__league"
        >
          {league} - {area}
        </Button>
        <Button
          color="primary"
          className="button__fixture"
        >
          Fixture: {fixture}
        </Button>
    </div>
  );
}
{/*<Paper className="current-choice__title">
        <Typography variant="h6" component="h3">
          {league} - {area}
        </Typography>
      </Paper>
      <Paper className="current-choice__title">
        <Typography variant="h6" component="h3">
          Fixture: {fixture}
        </Typography>
      </Paper>*/}