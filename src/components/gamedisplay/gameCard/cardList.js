import React from "react";
import GameCard from "./gameCard";

const CardList = ({ matches }) => {
	return (
		<div >
			{matches.map((match, i) => {
				return (
					<GameCard
						key={i}
						group={matches[i].match.group}
						homeTeam={matches[i].match.homeTeam.name}
						awayTeam={matches[i].match.awayTeam.name}
					/>
				);
			})}
		</div>
	);
};

export default CardList;
