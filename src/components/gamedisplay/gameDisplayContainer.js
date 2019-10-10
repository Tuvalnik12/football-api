import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import CardList from "./gameCard/cardList";
import CurrentChoice from "./currentchoice/CurrentChoice";
import "./gameDisplayContainer.css";

export default function gameDisplayContainer({
  alert,
  hasMenuChanged,
  matches,
  league,
  fixture,
  isPrams,
  area
}) {
  //console.log('hasMenuChanged', {hasMenuChanged})
  if (hasMenuChanged == true) {
    return (
      <Container fluid className="game-display__container">
        <CssBaseline />
        <CurrentChoice league={league} fixture={fixture} area={area} />
        <CardList matches={matches} />
      </Container>
    );
  } else {
    return <div></div>;
  }
}
