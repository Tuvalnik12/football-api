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
		competitionTeams: [],
		circularIndeterminate: false,
		isLoading: false,
		hasMenuChanged: false,
		isPrams: true,
		alert: alert,
		didGetCompititionFixture: false,
		didGetTeams: false
	};

	componentDidMount() {
		this.getCompetiotionsRaw();
		//this.getStandings();
	}

	/*async getStandings() {
		const request = await fetch(
			"http://api.football-data.org/v2/competitions/2021/standings",
			{
				method: "get",
				headers: {
					"Content-Type": "application/json",
					"X-Auth-Token": "8cd109a7cd8a4fd599ae76de90536c6a"
				}
			}
		);
		const data = await request.json();
		//console.log("table", data.standings[0].table);
	}*/

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
				rawCompetitions[0].data.competitions[i].id !== 2000 &&
				rawCompetitions[0].data.competitions[i].id !== 2013
			) {
				competitions.push(competition);
			}
		});
		this.setState({ competitions: competitions });
		//console.log(competitions);
		const err = await (err => console.log(err, "err"));
		await this.toggleLoader();
	}

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
				area: area,
				didGetCompititionFixture: false,
				didGetTeams: false
			});
			await this.getCompititionFixtures();
			await this.getCompetitionTeams();
		} else {
			return alert("You shall not pass! please fill the form!");
		}
	};

	async getCompetitionTeams() {
		const competitionTeams = [];
		const request = await fetch(
			`http://api.football-data.org/v2/competitions/${this.state.competitionId}/teams`,
			{
				method: "get",
				headers: {
					"Content-Type": "application/json",
					"X-Auth-Token": "8cd109a7cd8a4fd599ae76de90536c6a"
				}
			}
		);
		const data = await request.json();
		//console.log("data", data);
		competitionTeams.push(data.teams);
		this.setState(() => {
			return { competitionTeams: competitionTeams, didGetTeams: true };
		});
		await this.turnOnPairTeams();
		//await console.log("teams", competitionTeams);
	}

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
		//console.log("data", data);
		allMatches.push(data);
		await allMatches[0].matches.map((match, i) => {
			if (match.matchday === this.state.fixture) {
				fixture.push({ match });
			}
		});
		const err = await (error => console.log("oh no!"));
		await this.setState(() => {
			return { matches: fixture, didGetCompititionFixture: true };
		});
		//await console.log("matches-getMatches", this.state.matches);
		await this.getTimeAndDate();
		await this.turnOnPairTeams();
	};

	pairTeamsEmblem = async () => {
		const { matches, competitionTeams } = this.state;
		const teamsIdArray = [];
		const idUrlArray = [];
		//console.log("matches 1", matches);
		console.log("teams", competitionTeams);
		/*await matches.map((match, i) => {
			teamsIdArray.push(matches[i].match.awayTeam.id);
			teamsIdArray.push(matches[i].match.homeTeam.id);
		});*/
		await competitionTeams.map((subArray, i) => {
			const array = [];
			subArray.map((team, i) => {
				if (team) {
					const obj = {};
					obj.id = team.id;
					obj.url = team.crestUrl;
					array.push(obj);
					//console.log("obj", obj);
				}
			});
			idUrlArray.push(array);
		});
		await console.log("idUrlArray", idUrlArray);
		await idUrlArray.map(subArray => {
			subArray.map((team, i) => {
				if (team) {
					console.log("team", team);
					matches.map((match, i) => {
						if (matches[i].match.awayTeam.id === team.id) {
							let awayTeamUrl = Object.assign({}, this.state);
							awayTeamUrl.matches[i].match.awayTeamUrl = {
								emblemUrl: team.url
							};
							this.setState(awayTeamUrl);
						} else if (matches[i].match.homeTeam.id === team.id) {
							let homeTeamUrl = Object.assign({}, this.state);
							homeTeamUrl.matches[i].match.homeTeamUrl = {
								emblemUrl: team.url
							};
							this.setState(homeTeamUrl);
						}
					});
				}
			});
		});
		console.log("matches 2", matches);
		await this.toggleLoader();
	};
	getTimeAndDate = async () => {
		let hasTimeScheduled = null;
		const { matches } = this.state;
		const numberOfMatches = matches.length;
		for (let i = 0; i < numberOfMatches; i++) {
			const rawUtc = matches[i].match.utcDate;
			const newDate = new Date(rawUtc);
			let minute = String(newDate.getMinutes());
			const hour = String(newDate.getHours());
			if (minute === "0") {
				minute = "00";
			}
			let time = hour + ":" + minute;
			const dateString = newDate.toDateString();
			const day = String(newDate.getDate());
			const mounthMinusOne = newDate.getMonth();
			const one = 1;
			const month = String(mounthMinusOne + one);
			const date = day + "." + month;
			if (time === "2:00") {
				time = null;
				hasTimeScheduled = false;
			}
			let newTimeDate = Object.assign({}, this.state);
			newTimeDate.matches[i].match.timeDate = {
				time: time,
				date: date
			};
			this.setState(newTimeDate);
		}

		if (hasTimeScheduled === false) {
			alert("Times have yet to be scheduled for this fixture");
		}
		//await console.log("matches-after-DateTime", this.state.matches);
	};

	toggleLoader = (isLoading = null) => {
		this.setState(state => ({
			isLoading: isLoading !== null ? isLoading : !state.isLoading
		}));
	};

	turnOnPairTeams = () => {
		const { didGetTeams, didGetCompititionFixture } = this.state;
		if (didGetTeams === true && didGetCompititionFixture === true) {
			this.pairTeamsEmblem();
		}
	};

	hasMenuChanged = () => {
		this.setState({ hasMenuChanged: true });
	};

	render() {
		if (this.state.isLoading === true) {
			return (
				<div className="loader__container">
					<CircularIndeterminate />
				</div>
			);
		}
		{
			return (
				<div className="body__container">
					<GameMenuContainer
						handleMenuChanges={this.handleMenuChanges}
						competitions={this.state.competitions}
						handleNoEntry={this.handleNoEntry}
					/>
					<GameDisplayContainer
						isPrams={this.state.isPrams}
						league={this.state.league}
						matches={this.state.matches}
						fixture={this.state.fixture}
						hasMenuChanged={this.state.hasMenuChanged}
						area={this.state.area}
						times={this.state.times}
						dates={this.state.dates}
					/>
				</div>
			);
		}
	}
}

export default FootballAPI;
