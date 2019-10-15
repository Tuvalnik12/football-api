import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import "./gameCard.css";

export default function GameCard(props) {
  return (
    <Card className="game-card">
      <span className="time-box">{props.time}</span>
      <div className="div-name">
        <h4 className="names">{props.homeTeam}</h4>
      </div>
      <div className="emblems">
        <img src={props.emblemHomeTeam} alt="emblem" height="40px" />
        <span className="line"> - </span>
        <img src={props.emblemAwayTeam} alt="emblem" height="40px" />
      </div>
      <div className="div-name">
        <h4 className="names">{props.awayTeam}</h4>
      </div>
    </Card>
  );
}
