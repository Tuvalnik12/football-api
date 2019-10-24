import React from "react";
import GameCard from "./gameCard";

const CardList = ({ matches }) => {
	return (
		<div>
			{matches.map((match, i) => {
				return (
					<GameCard
						key={i}
						group={matches[i].group}
						homeTeam={matches[i].homeTeam.name}
						awayTeam={matches[i].awayTeam.name}
						time={matches[i].timeDate.time}
						date={matches[i].timeDate.date}
						emblemHomeTeam={matches[i].homeTeamUrl.emblemUrl}
						emblemAwayTeam={matches[i].awayTeamUrl.emblemUrl}
					/>
				);
			})}
		</div>
	);
};

export default CardList;
