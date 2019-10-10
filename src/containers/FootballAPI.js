import React, { Component } from "react";
import GameMenuContainer from "../components/gamemenu/gameMenuContainer";
import GameDisplayContainer from "../components/gamedisplay/gameDisplayContainer";
import CircularIndeterminate from "../components/loader/loader";
import Container from "@material-ui/core/Container";
import "./FootballAPI.css";

class FootballAPI extends Component {
	BASE_URL = "http://api.football-data.org/v2";
	state = {
		competitions: [],
		league: "",
		fixture: "",
		area: "",
		competitionId: 0,
		matches: [],
		circularIndeterminate: false,
		isLoading: false,
		hasMenuChanged: false,
		isPrams: true,
		alert: alert
	};

	componentDidMount() {
		this.getCompetiotionsRaw();
	}

	async getCompetiotionsRaw() {
		const rawCompetitions = [];
		const competitions = [];
		await this.toggleLoader();
		const request = await fetch(
			"http://api.football-data.org/v2/competitions",
			{
				method: "get",
				headers: {
					"Content-Type": "application/json",
					"X-Auth-Token": "8cd109a7cd8a4fd599ae76de90536c6a"
				}
			}
		);
		const data = await request.json();
		rawCompetitions.push({ data });
		await rawCompetitions[0].data.competitions.map((competition, i) => {
			if (
				rawCompetitions[0].data.competitions[i].plan === "TIER_ONE" &&
				rawCompetitions[0].data.competitions[i].id !== 2018 &&
				rawCompetitions[0].data.competitions[i].id !== 2000
			) {
				competitions.push(competition);
			}
		});
		this.setState({ competitions: competitions });
		const err = await (err => console.log(err, "err"));
		await this.toggleLoader();
	}

	toggleLoader = (isLoading = null) => {
		this.setState(state => ({
			isLoading: isLoading !== null ? isLoading : !state.isLoading
		}));
	};

	hasMenuChanged = () => {
		this.setState({ hasMenuChanged: true });
	};

	handleMenuChanges = async ({
		fixture,
		league,
		competitionId,
		area,
		isPrams
	}) => {
		if (isPrams == true) {
			await this.toggleLoader();
			await this.hasMenuChanged();
			await this.setState({
				isPrams: isPrams
			});
			await this.setState({
				league: league,
				fixture: fixture,
				competitionId: competitionId,
				area: area
			});
			await this.getCompititionFixtures();
		} else {
			return alert("You shall not pass! please fill the form!");
		}
	};

	getCompititionFixtures = async () => {
		let allMatches = [];
		let fixture = [];
		const request = await fetch(
			`http://api.football-data.org/v2/competitions/${this.state.competitionId}/matches`,
			{
				method: "get",
				headers: {
					"Content-Type": "application/json",
					"X-Auth-Token": "8cd109a7cd8a4fd599ae76de90536c6a"
				}
			}
		);
		const data = await request.json();
		allMatches.push(data);
		await allMatches[0].matches.map((match, i) => {
			if (match.matchday === this.state.fixture) {
				fixture.push({ match });
			}
		});

		const err = await (error => console.log("oh no!"));
		this.setState(() => {
			return { matches: fixture };
		});
		console.log("state - matches", this.state.matches);
		this.toggleLoader();
	};

	render() {
		if (this.state.isLoading === true) {
			return (
				<div className="loader__container">
					<CircularIndeterminate />
				</div>
			);
		} else {
			return (
				<div className="body__container">
					<GameMenuContainer
						handleMenuChanges={this.handleMenuChanges}
						competitions={this.state.competitions}
						handleNoEntry={this.handleNoEntry}
					/>
					<GameDisplayContainer
						alert={this.state.props}
						isPrams={this.state.isPrams}
						league={this.state.league}
						matches={this.state.matches}
						fixture={this.state.fixture}
						hasMenuChanged={this.state.hasMenuChanged}
						area={this.state.area}
					/>
				</div>
			);
		}
	}
}

export default FootballAPI;
