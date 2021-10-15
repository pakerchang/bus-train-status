import React, { useState, useEffect } from "react";
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	makeStyles,
	Typography,
	Button,
	Paper,
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
		await axios.get(url, { headers: getAuthorizationHeader }).then((res) => {
			console.log("get");
			setRawData(res.data.RailLiveBoard);
		});
	};
	const stationClick = (station) => {
		switch (station) {
			case 4220:
				return fetchData(station);
			case 4320:
				return fetchData(station);
			case 4330:
				return fetchData(station);
			case 4340:
				return fetchData(station);
			case 4400:
				return fetchData(station);
			default:
				return alert("error");
		}
	};

	useEffect(() => {
		if (rawData.length !== 0) {
			setOutputData(
				rawData.map((item) => {
					return {
						stationName: item.stationName,
						direction: item.Direction,
						trainType: item.TrainTypeName,
						arrivalTime: item.ScheduledArrivalTime,
						departTime: item.ScheduleDepartTime,
						delayTime: item.DelayTime,
					};
				})
			);
		}
	}, [setRawData]);
	return (
		<div className={classes.root}>
			<form className={classes.form}>
				<Button variant="contained" color="primary" onClick={(e) => stationClick(4220)}>
					台南
				</Button>
				<Button variant="contained" color="primary" onClick={(e) => stationClick(4320)}>
					楠梓
				</Button>
				<Button variant="contained" color="primary" onClick={(e) => stationClick(4330)}>
					新左營
				</Button>
				<Button variant="contained" color="primary" onClick={(e) => stationClick(4400)}>
					橋頭
				</Button>
			</form>
			{outputData === undefined || rawData.length === 0 ? (
				<h3>No Data</h3>
			) : (
				<TableContainer component={Paper} className={classes.tableRoot}>
					<Table className={classes.table} aria-label="caption table">
						<TableHead>
							<TableRow>
								<TableCell>車站</TableCell>
								<TableCell>車種</TableCell>
								<TableCell>到站</TableCell>
								<TableCell>離站</TableCell>
								<TableCell>誤點</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{outputData.map((item) => (
								<TableRow>
									<TableCell component="th" scope="row">
										<TableCell>{item.stationName}</TableCell>
										<TableCell>{item.trainTypeName}</TableCell>
										<TableCell>{item.arrivalTime}</TableCell>
										<TableCell>{item.departTime}</TableCell>
										<TableCell>{item.delayTime}</TableCell>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</div>
	);
}

const useStyles = makeStyles({
	root: {
		display: "flex",
		justifyItems: "center",
		flexDirection: "column",
		paddingTop: 30,
		backgroundColor: "#dadbd3",
		height: "100vh",
		"& h3": {
			textAlign: "center",
		},
	},
	form: {
		display: "flex",
		justifyContent: "space-around",
		marginBottom: 20,
	},
	tableRoot: {
		width: "100%",
		marginBottom: 30,
	},
	table: {
		maxWidth: "100%",
	},
});
