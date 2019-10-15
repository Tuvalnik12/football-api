import React from "react";
import GameCard from "./gameCard";

const CardList = ({ matches }) => {
	return (
		<div>
			{matches.map((match, i) => {
				return (
					<GameCard
						key={i}
						group={matches[i].match.group}
						homeTeam={matches[i].match.homeTeam.name}
						awayTeam={matches[i].match.awayTeam.name}
						time={matches[i].match.timeDate.time}
						emblemHomeTeam={matches[i].match.homeTeamUrl.emblemUrl}
						emblemAwayTeam={matches[i].match.awayTeamUrl.emblemUrl}
					/>
				);
			})}
		</div>
	);
};

export default CardList;
