import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

const columns = [
	{ id: "position", label: "Pos", minWidth: 20 },
	{ id: "name", label: "Team", minWidth: 60 },
	{
		id: "played",
		label: "P",
		minWidth: 20,
		align: "right",
		format: value => value.toLocaleString()
	},
	{
		id: "won",
		label: "W",
		minWidth: 20,
		align: "right",
		format: value => value.toLocaleString()
	},
	{
		id: "lost",
		label: "L",
		minWidth: 20,
		align: "right",
		format: value => value.toLocaleString()
	},
	{
		id: "goalsFor",
		label: "F",
		minWidth: 20,
		align: "right",
		format: value => value.toLocaleString()
	},
	{
		id: "goalsAganist",
		label: "A",
		minWidth: 20,
		align: "right",
		format: value => value.toLocaleString()
	},
	{
		id: "goalsDiffrence",
		label: "+/-",
		minWidth: 20,
		align: "right",
		format: value => value.toLocaleString()
	},
	{
		id: "points",
		label: "PTS",
		minWidth: 20,
		align: "right",
		format: value => value.toLocaleString()
	}
];

function createData(
	position,
	url,
	name,
	played,
	won,
	lost,
	goalsFor,
	goalsAganist,
	goalsDiffrence,
	points
) {
	return {
		position,
		url,
		name,
		played,
		won,
		lost,
		goalsFor,
		goalsAganist,
		goalsDiffrence,
		points
	};
}

const useStyles = makeStyles({
	root: {
		width: "100%",
		gridColumn: 2 / 2,
		gridRowStart: 1,
		gridRowEnd: 2,
		alignSelf: "flex-end",
		order: "1"
	},
	tableWrapper: {
		maxHeight: 440,
		overflow: "auto"
	}
});

export default function CompetitionTable({
	competitionStandings,
	route,
	onRouteChange,
	hasMenuChanged,
	didStandings
}) {
	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(20);

	if (competitionStandings === null) {
		return null;
	}
	const rows = competitionStandings.map((row, i) => {
		if (competitionStandings === null) {
			return null;
		}
		return createData(
			row.position,
			row.team.crestUrl,
			row.team.name,
			row.playedGames,
			row.won,
			row.lost,
			row.goalsFor,
			row.goalsAgainst,
			row.goalDifference,
			row.points
		);
	});

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	if (hasMenuChanged && didStandings === true) {
		return (
			<div className="table__container">
				{/*<Button
					variant="contained"
					color="primary"
					className="button__back-to"
					onClick={onRouteChange}
					value="menu"
				>
					Back To Matches
				</Button>*/}
				<Paper className={classes.root}>
					<div className={classes.tableWrapper}>
						<Table
							className="table"
							stickyHeader
							aria-label="sticky table"
						>
							<TableHead>
								<TableRow>
									{columns.map(column => (
										<TableCell
											key={column.position}
											align={column.align}
											style={{
												minWidth: column.minWidth
											}}
										>
											{column.label}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{rows
									.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage
									)
									.map(row => {
										return (
											<TableRow
												hover
												role="checkbox"
												tabIndex={-1}
												key={row.code}
											>
												{columns.map(column => {
													const value =
														row[column.id];
													return (
														<TableCell
															key={column.id}
															align={column.align}
														>
															{column.format &&
															typeof value ===
																"number"
																? column.format(
																		value
																  )
																: value}
														</TableCell>
													);
												})}
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					</div>
				</Paper>
			</div>
		);
	}
	{
		return <div> </div>;
	}
}
