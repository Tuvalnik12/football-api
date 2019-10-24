import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import "./home.css";

export default function Home({ onRouteChange }) {
	return (
		<div className="container">
			<Paper className="home__title">
				<h2>Welcome to FutSTAT!</h2>
				<p>If Football is your passion, FutSTAT is the app for you!</p>
				<p>
					FutSTAT is a simple football statistics app that lets you
					explore the biggest and most popular football leagues in
					Europe. We help you stay updated with any game, result and
					of course league standings. Now it's your turn - explore and
					have fun!
				</p>
				<Button
					variant="contained"
					color="primary"
					className="button__get-started"
					onClick={onRouteChange}
					value="test"
				>
					Get Started!
				</Button>
			</Paper>
			<div className="container__img">
				<img
					className="img"
					alt='Premier League logo'
					src="https://dnlzsmybcpo0z.cloudfront.net/big/806527.jpg?v=35045"
				/>
				<img
					className="img"
					alt="UCL Logo"
					src="https://www.sportsvillagesquare.com/wp-content/uploads/2018/04/UEFA-Champions-League-Logo.jpg"
				/>
				<img
					className="img"
					alt="Bundesliga Logo"
					src="https://1.bp.blogspot.com/-dfd7PVwkv38/Vs6h-ZDi9uI/AAAAAAAADmc/tKSQHydJvUU/s1600/Logo-Bundesliga-01-header.jpg"
				/>
				<img
					className="img"
					alt="Seria A Logo"
					src="https://www.soccerbible.com/media/93701/1-serie-a-logo-new.jpg"
				/>
				<img
					className="img"
					alt="La Liga Logo"
					src="https://iscreativestudio.com/wp-content/uploads/2016/08/logotipos2.jpg"
				/>
			</div>
		</div>
	);
}
