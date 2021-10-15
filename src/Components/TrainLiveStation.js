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
				// console.log("raw:", res.data);
				setRawData(res.data);
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
			const station = rawData.map((item) => {
				return {
					stationID: item.stationID,
					stationName: item.EndingStationName.Zh_tw,
					trainType: item.TrainTypeName.Zh_tw,
					direction: item.Direction,
					arrivalTime: item.ScheduledArrivalTime,
					departTime: item.ScheduledDepartureTime,
					delayTime: item.DelayTime,
				};
			});
			setOutputData(station);
		}
	}, [rawData]);
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
			{outputData === undefined ? (
				<h3>No Data</h3>
			) : (
				<TableContainer component={Paper} className={classes.tableRoot}>
					<Table className={classes.table} aria-label="caption table">
						<TableHead>
							<TableRow>
								<TableCell style={{ textAlign: "center" }}>車站</TableCell>
								<TableCell style={{ textAlign: "center" }}>車種</TableCell>
								<TableCell style={{ textAlign: "center" }}>到站</TableCell>
								<TableCell style={{ textAlign: "center" }}>離站</TableCell>
								<TableCell style={{ textAlign: "center" }}>誤點</TableCell>
								<TableCell style={{ textAlign: "center" }}>方向</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{outputData.map((item) => (
								<TableRow>
									<TableCell className={classes.tableBodyCell}>{item.stationName}</TableCell>
									<TableCell className={classes.tableBodyCell}>{item.trainType.replace(/\([^()]*\)/g, "")}</TableCell>
									<TableCell className={classes.tableBodyCell}>{item.arrivalTime}</TableCell>
									<TableCell className={classes.tableBodyCell}>{item.departTime}</TableCell>
									<TableCell className={classes.tableBodyCell}>
										{item.delayTime === 0 ? "準點" : "誤點 " + item.delayTime + " 分"}
									</TableCell>
									<TableCell className={classes.tableBodyCell}>{item.direction === 1 ? "南下" : "北上"}</TableCell>
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
		paddingTop: 30,
		display: "flex",
		justifyItems: "center",
		flexDirection: "column",
		backgroundColor: "#dadbd3",
		height: "100vh",
		overflowX: "auto",
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
	tableHeadCell: {},
	tableBodyCell: {
		width: "auto",
		textAlign: "center",
		fontSize: 14,
		fontFamily: ["Saira Condensed", "sans-serif"],
	},
});
