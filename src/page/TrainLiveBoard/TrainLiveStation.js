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
	Typography,
} from "@material-ui/core";
import { trainLiveStation } from "../../requests";
import getAuthorizationHeader from "../../apiKey";
import axios from "axios";
import { differenceInMinutes, format, parse } from "date-fns";

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
		// 阻止 ios 橡皮筋滾動特效
		// console.log("execute");
		window.addEventListener("touchmove", {}, { passive: false });
		return () => {
			window.removeEventListener("touchmove", {});
		};
	}, []);

	useEffect(() => {
		if (rawData.length !== 0) {
			// split data to Direction and filter past time data
			const south = rawData.filter((item) => {
				// const compareTime = differenceInMinutes(parse(item.ScheduledArrivalTime, "HH:mm:ss", new Date()), new Date());
				// const result = compareTime >= 0;
				// console.log("compare: ", compareTime);
				// console.log("result: ", result);
				return (
					item.Direction === 1 &&
					differenceInMinutes(parse(item.ScheduledArrivalTime, "HH:mm:ss", new Date()), new Date()) > 0
				);
			});
			const north = rawData.filter((item) => {
				return (
					item.Direction === 0 &&
					differenceInMinutes(parse(item.ScheduledArrivalTime, "HH:mm:ss", new Date()), new Date()) > 0
				);
			});
			// console.log("南:", south);
			// console.log("北:", north);
			setOutputData([north, south]);
		}
	}, [rawData]);
	// console.log("output: ", outputData);
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
				// div 會吃到原 body 的背景顏色或區域延展問題導致下半部分區塊背景色會呈現白色，所以直接複寫把顏色修正回原設定的目標色
				<div style={{ backgroundColor: "#dadbd3", paddingBottom: 30 }}>
					<Typography variant="h4" className={classes.textDiv}>
						北上
					</Typography>
					<TableContainer className={classes.tableRoot}>
						<Table className={classes.table} aria-label="caption table">
							<TableHead>
								<TableRow>
									<TableCell style={{ textAlign: "center" }}>車站</TableCell>
									<TableCell style={{ textAlign: "center" }}>車種</TableCell>
									<TableCell style={{ textAlign: "center" }}>到站</TableCell>
									<TableCell style={{ textAlign: "center" }}>離站</TableCell>
									<TableCell style={{ textAlign: "center" }}>誤點</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{outputData[0].map((item) => {
									return (
										<TableRow key={item.TrainNo}>
											<TableCell className={classes.tableBodyCell}>{item.EndingStationName.Zh_tw}</TableCell>
											<TableCell className={classes.tableBodyCell}>
												{item.TrainTypeName.Zh_tw.replace(/\([^()]*\)/g, "")}
											</TableCell>
											<TableCell className={classes.tableBodyCell}>
												{format(parse(item.ScheduledArrivalTime, "HH:mm:ss", new Date()), "HH:mm")}
											</TableCell>
											<TableCell className={classes.tableBodyCell}>
												{format(parse(item.ScheduledArrivalTime, "HH:mm:ss", new Date()), "HH:mm")}
											</TableCell>
											<TableCell className={classes.tableBodyCell}>
												{item.DelayTime === 0 ? "準點" : "晚 " + item.DelayTime + " 分"}
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>

					<Typography variant="h4" className={classes.textDiv}>
						南下
					</Typography>
					<TableContainer className={classes.tableRoot}>
						<Table className={classes.table} aria-label="caption table">
							<TableHead>
								<TableRow>
									<TableCell style={{ textAlign: "center" }}>車站</TableCell>
									<TableCell style={{ textAlign: "center" }}>車種</TableCell>
									<TableCell style={{ textAlign: "center" }}>到站</TableCell>
									<TableCell style={{ textAlign: "center" }}>離站</TableCell>
									<TableCell style={{ textAlign: "center" }}>誤點</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{outputData[1].map((item) => {
									return (
										<TableRow key={item.TrainNo}>
											<TableCell className={classes.tableBodyCell}>{item.EndingStationName.Zh_tw}</TableCell>
											<TableCell className={classes.tableBodyCell}>
												{item.TrainTypeName.Zh_tw.replace(/\([^()]*\)/g, "")}
											</TableCell>
											<TableCell className={classes.tableBodyCell}>
												{format(parse(item.ScheduledArrivalTime, "HH:mm:ss", new Date()), "HH:mm")}
											</TableCell>
											<TableCell className={classes.tableBodyCell}>
												{format(parse(item.ScheduledArrivalTime, "HH:mm:ss", new Date()), "HH:mm")}
											</TableCell>
											<TableCell className={classes.tableBodyCell}>
												{item.DelayTime === 0 ? "準點" : "晚 " + item.DelayTime + " 分"}
											</TableCell>
										</TableRow>
									);
								})}
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
		display: "flex",
		justifyItems: "center",
		flexDirection: "column",
		height: "100vh",
		backgroundColor: "#dadbd3",
		// overflow: "scroll",
		"& h3": {
			textAlign: "center",
		},
	},
	form: {
		paddingTop: 30,
		display: "flex",
		justifyContent: "space-around",
		marginBottom: 20,
	},
	textDiv: {
		margin: "15px 0",
	},
	tableRoot: {
		width: "100%",
		overflow: "auto",
	},
	table: {
		maxWidth: "100%",
		backgroundColor: "#fff",
	},
	tableBodyCell: {
		width: "auto",
		textAlign: "center",
		fontSize: 12,
		fontFamily: ["Saira Condensed", "sans-serif"],
	},
});
