import React from "react";
import Card from "@material-ui/core/Card";
import "./gameCard.css";

export default function GameCard(props) {
  return (
    <Card className="game-card">
      <span className="time-box">{props.time}</span>
      <span className="date-box">{props.date}</span>
      <div className="div-name-home">
        <h4 className="names">{props.homeTeam}</h4>
      </div>
      <div className="emblems">
        <img src={props.emblemHomeTeam} alt="emblem" height="40px" />
        <span className="line"> - </span>
        <img src={props.emblemAwayTeam} alt="emblem" height="40px" />
      </div>
      <div className="div-name-away">
        <h4 className="names">{props.awayTeam}</h4>
      </div>
    </Card>
  );
}
