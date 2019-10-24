import React, { Component } from "react";

import initialDataModule from "../../lib/initialDataModule";
import standingsModule from "../../lib/standingsModule";
import competitionTeamsModule from "../../lib/competitionTeamsModule";
import compititionFixturesModule from "../../lib/compititionFixturesModule";
import GameMenuContainer from "../../components/gamemenu/gameMenuContainer";
import GameDisplayContainer from "../../components/gamedisplay/gameDisplayContainer";
import CircularIndeterminate from "../../components/loader/loader";
import CompetitionTable from "../../components/table/table";
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
		didGetTeams: false,
		competitionStandings: [],
		didStandings: false,
		route: "menu"
	};

	componentDidMount() {
		this.getInitialData();
	}

	async getInitialData() {
		await this.toggleLoader();
		const competitions = await initialDataModule.getCompetitions();
		this.setState(
			{
				competitions
			},
			() => {
				this.toggleLoader();
			}
		);
	}

	handleMenuChanges = async ({
		fixture,
		league,
		competitionId,
		area,
		isPrams
	}) => {
		if (isPrams === true) {
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
			await this.getStandings();
			await this.getCompetitionTeams();
			await this.getCompititionFixtures();
		} else {
			return alert("You shall not pass! please fill the form!");
		}
	};

	async getStandings() {
		const competitionStandings = await standingsModule.getTable(
			this.state.competitionId
		);
		this.setState({
			competitionStandings,
			didStandings: true
		});
	}

	async getCompetitionTeams() {
		const competitionTeams = await competitionTeamsModule.getSelectedTeams(
			this.state.competitionId
		);
		this.setState({
			competitionTeams,
			didGetTeams: true
		});
		await this.turnOnPairTeams();
	}

	async getCompititionFixtures() {
		const matches = await compititionFixturesModule.getFixture(
			this.state.competitionId,
			this.state.fixture
		);
		this.setState({
			matches,
			didGetCompititionFixture: true
		});
		await this.getTimeAndDate();
		await this.turnOnPairTeams();
	}

	pairTeamsEmblem = async () => {
		const { matches, competitionTeams } = this.state;
		const idUrlArray = [];
		await competitionTeams.map((team, i) => {
			const array = [];
			if (team) {
				if (team.id === 521) {
					team.crestUrl =
						"https://vignette.wikia.nocookie.net/logopedia/images/c/c1/Lille_OSC_2018.png/revision/latest?cb=20180626135202";
				}
				if (team.id === 82) {
					team.crestUrl =
						"https://vignette.wikia.nocookie.net/logopedia/images/e/ea/Getafe.png/revision/latest?cb=20161112021848";
				}
				if (team.id === 745) {
					team.crestUrl =
						"https://vignette.wikia.nocookie.net/logopedia/images/1/1f/Legan%C3%A9s.jpg/revision/latest?cb=20161111231421";
				}
				const obj = {};
				obj.id = team.id;
				obj.url = team.crestUrl;
				array.push(obj);
			}
			idUrlArray.push(array);
		});
		await idUrlArray.map(subArray => {
			subArray.map((team, i) => {
				if (team) {
					matches.map((match, i) => {
						if (matches[i].awayTeam.id === team.id) {
							let awayTeamUrl = Object.assign({}, this.state);
							awayTeamUrl.matches[i].awayTeamUrl = {
								emblemUrl: team.url
							};
							this.setState(awayTeamUrl);
						} else if (matches[i].homeTeam.id === team.id) {
							let homeTeamUrl = Object.assign({}, this.state);
							homeTeamUrl.matches[i].homeTeamUrl = {
								emblemUrl: team.url
							};
							this.setState(homeTeamUrl);
						}
					});
				}
			});
		});
		await this.toggleLoader();
	};
	getTimeAndDate = async () => {
		let hasTimeScheduled = null;
		const { matches } = this.state;
		const numberOfMatches = matches.length;
		for (let i = 0; i < numberOfMatches; i++) {
			const rawUtc = matches[i].utcDate;
			const newDate = new Date(rawUtc);
			let minute = String(newDate.getMinutes());
			const hour = String(newDate.getHours());
			if (minute === "0") {
				minute = "00";
			}
			let time = hour + ":" + minute;
			const day = String(newDate.getDate());
			const mounthMinusOne = newDate.getMonth();
			const one = 1;
			const month = String(mounthMinusOne + one);
			const date = day + "." + month;
			if (time === "2:00") {
				time = "17:00";
				hasTimeScheduled = false;
			}
			let newTimeDate = Object.assign({}, this.state);
			newTimeDate.matches[i].timeDate = {
				time: time,
				date: date
			};
			this.setState(newTimeDate);
		}
		if (hasTimeScheduled === false) {
			alert("Times have yet to be scheduled for this fixture");
		}
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

	onRouteChange = event => {
		this.setState({ route: event.target.value });
	};

	render() {
		if (this.state.isLoading === true) {
			return (
				<div className="loader__container">
					<CircularIndeterminate />
				</div>
			);
		}
		if (this.state.route === "menu") {
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
						didStandings={this.state.didStandings}
						competitionStandings={this.state.competitionStandings}
						onRouteChange={this.onRouteChange}
					/>
					{this.state.competitionStandings.map((table, i) => {
						if (this.state.competitionStandings.length === 1) {
							return (
								<CompetitionTable
									key={i}
									group={this.state.league}
									competitionStandings={table}
									route={this.state.route}
									onRouteChange={this.onRouteChange}
									hasMenuChanged={this.state.hasMenuChanged}
									didStandings={this.state.didStandings}
								/>
							);
						}
						if (this.state.competitionStandings.length > 1) {
							let uclTable = this.state.competitionStandings[i]
								.table;
							let spl = this.state.competitionStandings[
								i
							].group.split("GROUP_");
							let coma = "GROUP " + spl;
							let group = coma.split(",");
							return (
								<CompetitionTable
									key={i}
									competitionStandings={uclTable}
									route={this.state.route}
									group={group}
									onRouteChange={this.onRouteChange}
									hasMenuChanged={this.state.hasMenuChanged}
									didStandings={this.state.didStandings}
								/>
							);
						}
					})}
				</div>
			);
		}
	}
}

export default FootballAPI;
