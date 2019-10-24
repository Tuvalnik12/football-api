import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./formMenu.css";

export default function DialogSelect(
  { handleNoEntry, competitions, handleMenuChanges },
  props
) {
  const [state, setState] = React.useState({
    open: false,
    league: "",
    fixtureAmount: 0,
    fixture: "",
    fixtureItems: [],
    competitionId: 0,
    area: "",
    competitions: { competitions },
    hasLeagueChanged: false,
    hasFixtureAmount: false
  });

  React.useEffect(() => {
    if (state.hasLeagueChanged === true) {
      handleFixtureAmount();
    }
    if (state.hasFixtureAmount === true) {
      handleFixtureMenuItem();
    }
  });

  const handleFixtureAmount = () => {
    if (state.competitionId === 2021) {
      setState({
        ...state,
        fixtureAmount: 38,
        hasLeagueChanged: false,
        hasFixtureAmount: true
      });
    }
    if (state.competitionId === 2001) {
      setState({
        ...state,
        fixtureAmount: 6,
        hasLeagueChanged: false,
        hasFixtureAmount: true
      });
    }
    if (state.competitionId === 2002) {
      setState({
        ...state,
        fixtureAmount: 34,
        hasLeagueChanged: false,
        hasFixtureAmount: true
      });
    }
    if (state.competitionId === 2019) {
      setState({
        ...state,
        fixtureAmount: 38,
        hasLeagueChanged: false,
        hasFixtureAmount: true
      });
    }
    if (state.competitionId === 2014) {
      setState({
        ...state,
        fixtureAmount: 38,
        hasLeagueChanged: false,
        hasFixtureAmount: true
      });
    }
  };

  const handleChangeLeague = name => event => {
    setState({
      ...state,
      league: event.target.value.name,
      competitionId: event.target.value.id,
      area: event.target.value.area,
      hasLeagueChanged: true
    });
  };

  const handleFixtureMenuItem = () => {
    const fixtureArray = [];
    for (let i = 1; i <= state.fixtureAmount; i++) {
      let fixture = Number(i);
      fixtureArray.push(fixture);
    }
    setState({ ...state, fixtureItems: fixtureArray, hasFixtureAmount: false });
  };

  const handleChangeFixture = event => {
    setState({ ...state, fixture: event.target.value });
  };

  const handleClickOk = event => {
    if (Boolean(state.league) && Boolean(state.fixture)) {
      return handleMenuChanges({
        league: state.league,
        fixture: state.fixture,
        competitionId: state.competitionId,
        area: state.area,
        isPrams: true
      });
    } else {
      return handleMenuChanges({
        isPrams: false
      });
    }
  };

  const handleClickOpen = () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div className="dialog__select__container">
      <Button onClick={handleClickOpen} className="dialog__button">
        Choose here!
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={state.open}
        onClose={handleClose}
      >
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <form className="form-container">
            <FormControl className="form__control">
              <InputLabel htmlFor="age-simple">League</InputLabel>
              <Select
                value={state.league}
                onChange={handleChangeLeague("league")}
                input={<Input id="age-native-simple" />}
              >
                {competitions.map((competition, i) => (
                  <MenuItem
                    key={i}
                    value={{
                      name: competition.name,
                      id: competition.id,
                      area: competition.area.name
                    }}
                  >
                    {competition.name} - {competition.area.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className="form__control">
              <InputLabel htmlFor="age-simple">Fixture</InputLabel>
              <Select
                value={state.fixture}
                onChange={handleChangeFixture}
                input={<Input id="age-native-simple" />}
              >
                {state.fixtureItems.map((fixture, i) => (
                  <MenuItem key={i} value={i}>
                    {fixture}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={event => {
              handleClose(event);
              handleClickOk(event);
            }}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
