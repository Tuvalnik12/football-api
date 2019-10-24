import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import "./pageHeader.css";

export default function PageHeader() {
	return (
		<Paper className="header-container">
			<Typography variant="h5" component="h3" className="title">
				Choose league and fixture
			</Typography>
		</Paper>
	);
}
