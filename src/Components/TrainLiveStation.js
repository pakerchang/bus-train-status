import React, { useState, useEffect } from "react";
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	makeStyles,
	Button,
	Paper,
	Typography,
} from "@material-ui/core";
import { trainLiveStation } from "../requests";
import getAuthorizationHeader from "../apiKey";
import axios from "axios";

export default function TrainLiveStation() {
	const classes = useStyles();
	const [rawData, setRawData] = useState([]);
	const [outputData, setOutputData] = useState();

	const fetchData = async (stationID) => {
		const url = trainLiveStation(stationID);
		await axios
			.get(url, {
				headers: getAuthorizationHeader(),
			})
			.then((res) => {
				console.log("raw:", res.data);
				setRawData(res.data);
			});
	};
	const stationClick = (station) => {
		switch (station) {
			case 4220:
				return fetchData(station);
			case 4310:
				return fetchData(station);
			case 4330:
				return fetchData(station);
			case 4340:
				return fetchData(station);
			case 4400:
				return fetchData(station);
			default:
				return alert("無資料");
		}
	};

	useEffect(() => {
		if (rawData.length !== 0) {
			const north = rawData.filter((item) => {
				return item.Direction === 1;
			});
			const south = rawData.filter((item) => {
				return item.Direction === 0;
			});
			// const result = [north, south];
			setOutputData([north, south]);
		}
	}, [rawData]);
	return (
		<div className={classes.root}>
			<form className={classes.form}>
				<Button variant="contained" color="primary" onClick={(e) => stationClick(4220)}>
					台南
				</Button>
				<Button variant="contained" color="primary" onClick={(e) => stationClick(4400)}>
					岡山
				</Button>
				<Button variant="contained" color="primary" onClick={(e) => stationClick(4330)}>
					楠梓
				</Button>
				<Button variant="contained" color="primary" onClick={(e) => stationClick(4340)}>
					新左營
				</Button>
			</form>
			{outputData === undefined ? (
				<h3>No Data</h3>
			) : (
				<div className={classes.tableCollect}>
					<Typography variant="h4">南下</Typography>
					<TableContainer component={Paper} className={classes.tableRoot}>
						<Table className={classes.table} aria-label="caption table">
							<TableHead>
								<TableRow>
									<TableCell style={{ textAlign: "center" }}>車站</TableCell>
									<TableCell style={{ textAlign: "center" }}>車種</TableCell>
									<TableCell style={{ textAlign: "center" }}>到站</TableCell>
									<TableCell style={{ textAlign: "center" }}>離站</TableCell>
									<TableCell style={{ textAlign: "center" }}>誤點</TableCell>
									{/* <TableCell style={{ textAlign: "center" }}>方向</TableCell> */}
								</TableRow>
							</TableHead>
							<TableBody>
								{outputData[0].map((item) => (
									<TableRow key={item.TrainNo}>
										<TableCell className={classes.tableBodyCell}>{item.EndingStationName.Zh_tw}</TableCell>
										<TableCell className={classes.tableBodyCell}>
											{item.TrainTypeName.Zh_tw.replace(/\([^()]*\)/g, "")}
										</TableCell>
										<TableCell className={classes.tableBodyCell}>
											{item.ScheduledArrivalTime.replace(/:00{1}/g, "")}
										</TableCell>
										<TableCell className={classes.tableBodyCell}>
											{item.ScheduledDepartureTime.replace(/:00{1}/g, "")}
										</TableCell>
										<TableCell className={classes.tableBodyCell}>
											{item.DelayTime === 0 ? "準點" : "晚 " + item.DelayTime + " 分"}
										</TableCell>
										{/* <TableCell className={classes.tableBodyCell}>{item.direction === 1 ? "南下" : "北上"}</TableCell> */}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<Typography variant="h4">北上</Typography>
					<TableContainer component={Paper} className={classes.tableRoot}>
						<Table className={classes.table} aria-label="caption table">
							<TableHead>
								<TableRow>
									<TableCell style={{ textAlign: "center" }}>車站</TableCell>
									<TableCell style={{ textAlign: "center" }}>車種</TableCell>
									<TableCell style={{ textAlign: "center" }}>到站</TableCell>
									<TableCell style={{ textAlign: "center" }}>離站</TableCell>
									<TableCell style={{ textAlign: "center" }}>誤點</TableCell>
									{/* <TableCell style={{ textAlign: "center" }}>方向</TableCell> */}
								</TableRow>
							</TableHead>
							<TableBody>
								{outputData[1].map((item) => (
									<TableRow key={item.TrainNo}>
										<TableCell className={classes.tableBodyCell}>{item.EndingStationName.Zh_tw}</TableCell>
										<TableCell className={classes.tableBodyCell}>
											{item.TrainTypeName.Zh_tw.replace(/\([^()]*\)/g, "")}
										</TableCell>
										<TableCell className={classes.tableBodyCell}>
											{item.ScheduledArrivalTime.replace(/:00{1}/g, "")}
										</TableCell>
										<TableCell className={classes.tableBodyCell}>
											{item.ScheduledDepartureTime.replace(/:00{1}/g, "")}
										</TableCell>
										<TableCell className={classes.tableBodyCell}>
											{item.DelayTime === 0 ? "準點" : "晚 " + item.DelayTime + " 分"}
										</TableCell>
										{/* <TableCell className={classes.tableBodyCell}>{item.direction === 1 ? "南下" : "北上"}</TableCell> */}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			)}
		</div>
	);
}

const useStyles = makeStyles({
	root: {
		paddingTop: 30,
		display: "flex",
		justifyItems: "center",
		flexDirection: "column",
		backgroundColor: "#dadbd3",
		height: "100vh",
		overflow: "auto",
		WebkitOverflowScrolling: "auto",
		"& h3": {
			textAlign: "center",
		},
	},
	form: {
		display: "flex",
		justifyContent: "space-around",
		marginBottom: 20,
	},
	tableCollect: {
		alignItems: "center",
	},
	tableRoot: {
		marginTop: 10,
		width: "100%",
		marginBottom: 30,
	},
	table: {
		maxWidth: "100%",
	},
	tableBodyCell: {
		width: "auto",
		textAlign: "center",
		fontSize: 12,
		fontFamily: ["Saira Condensed", "sans-serif"],
	},
});
