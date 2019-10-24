import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import CardList from "./gameCard/cardList";
import CurrentChoice from "./currentchoice/CurrentChoice";
import "./gameDisplayContainer.css";

export default function gameDisplayContainer({
  hasMenuChanged,
  matches,
  league,
  fixture,
  isPrams,
  area,
  didStandings,
  competitionStandings,
  onRouteChange
}) {
  if (hasMenuChanged && didStandings === true) {
    return (
      <Container fluid className="game-display__container">
        <CssBaseline />
        <div className="buttons__container">
          <CurrentChoice league={league} fixture={fixture} area={area} />
        </div>
        <CardList matches={matches} />
      </Container>
    );
  }
  {
    return <div></div>;
  }
}
