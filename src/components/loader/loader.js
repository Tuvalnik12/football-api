import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function CircularIndeterminate() {
	return (
		<div className="loader__container">
			<CircularProgress className="loader" color="secondary" />
		</div>
	);
}
