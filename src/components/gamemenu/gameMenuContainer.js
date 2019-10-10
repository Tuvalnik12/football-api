import React from "react";
//import CssBaseline from '@material-ui/core/CssBaseline';
import Container from "@material-ui/core/Container";
import PageHeader from "./above-content/pageHeader";
import FormMenu from "./above-content/formMenu";
import "./gameMenuContainer.css";

const gameMenuContainer = ({ handleMenuChanges, competitions }) => {
	return (
		<Container className="game-menu__container" fluid>
			<PageHeader />
			<FormMenu
				competitions={competitions}
				handleMenuChanges={handleMenuChanges}
			/>
		</Container>
	);
};

export default gameMenuContainer;
