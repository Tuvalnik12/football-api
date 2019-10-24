import React from "react";
import HideAppBar from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import FootballAPI from "./containers/football-api/FootballAPI";
import Home from "./containers/home/home";
import "./App.css";
import { useAlert } from "react-alert";
import { positions, transitions, types } from "react-alert";

const App = () => {
  const [state, setState] = React.useState({
    route: "home"
  });
  const alert = useAlert();
  const onRouteChange = event => {
    setState({ ...state, route: event.target.value });
  };
  return (
    <div className="app">
      <HideAppBar />
      {state.route === "home" ? (
        <div className="home__container">
          <Home onRouteChange={onRouteChange} />
        </div>
      ) : (
        <FootballAPI value={alert} route={state.route} />
      )}
      <Footer />
    </div>
  );
};

export default App;

