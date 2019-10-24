import React from "react";
import "./CurrentChoice.css";

export default function CurrentChoice({ league, fixture, area }) {
  return (
    <div className="current-choice__container">
      <h3 className="title__league">
        {league} - {area}
      </h3>
      <h3 className="title__fixture">Fixture: {fixture}</h3>
    </div>
  );
}
