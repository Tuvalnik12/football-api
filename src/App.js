import React, { Component } from "react";
import HideAppBar from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import FootballAPI from "./containers/FootballAPI";
import "./App.css";
import { useAlert } from "react-alert";
import { positions, transitions, types } from "react-alert";

const App = () => {
  const alert = useAlert();
  return (
    <div className="app">
      <HideAppBar />
      <div>
        <FootballAPI value={alert} />
      </div>
      <Footer />
    </div>
  );
};

export default App;

/* problems:
  1. league not shown when chosen on formMenu.
  2. fixture function - amount of fixtures to each competition.*/
