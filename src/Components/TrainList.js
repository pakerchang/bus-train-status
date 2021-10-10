/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { trainAPI } from "../requests";
import getAuthorizationHeader from "../apiKey";
//material-ui
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core";
import TrainIcon from "@material-ui/icons/Train";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
	tableRoot: {
		backgroundColor: "#3f51b5",
		marginTop: 15,
		borderRadius: 15,
		alignItems: "center",
		textAlign: "center",
	},
	tableCell: {
		backgroundColor: "#fff",
	},
}));

function TrainList({ originStation, destination, date }) {
	const [rawData, setRawData] = useState([]);
	const classes = useStyles();

	useEffect(async () => {
		if (originStation && destination && date !== "") {
			const reqURL = trainAPI(
				originStation,
				destination,
				date
			);
			await axios
				.get(reqURL, { headers: getAuthorizationHeader() })
				.then((res) => {
					console.log("raw: ", res.data);
					setRawData(res.data.TrainTimetables);
				})
				.catch((error) => console.log(error));
		}
	}, [originStation, destination, date]);

	const trainInfo = rawData.map((item) => ({
		originStationName:
			item.TrainInfo.StartingStationName.Zh_tw,
		endStationName: item.TrainInfo.EndingStationName.Zh_tw,
		trainID: item.TrainInfo.TrainNo,
		trainType: item.TrainInfo.TrainTypeName.Zh_tw,
		departure: item.StopTimes[0].DepartureTime,
		arrival: item.StopTimes[1].ArrivalTime,
	}));
	console.log(trainInfo);
	// 需要處理邏輯的資料
	// 行車順行逆行
	// 行駛時間計算
	// 修改車種名稱

	trainInfo.sort((first, second) => {
		return first.departure.localeCompare(second.departure);
	});

	return (
		<div className="trainList">
			<TableContainer>
				<Table classes={{ root: classes.tableRoot }}>
					<TableHead>
						<TableRow>
							<TableCell align="center">
								車種車次 (始發站 <ArrowRightAltIcon />{" "}
								終點站)
							</TableCell>
							<TableCell align="center">車次</TableCell>
							<TableCell align="center">出發時間</TableCell>
							<TableCell align="center">抵達時間</TableCell>
							<TableCell align="center">行駛時間</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{trainInfo.map((item) => (
							<TableRow>
								<TableCell
									align="center"
									className={classes.tableCell}>
									<TrainIcon />
									{item.trainType.replace(
										/\([^()]*\)/g,
										""
									)}{" "}
									({item.originStationName}{" "}
									<ArrowRightAltIcon />{" "}
									{item.endStationName})
								</TableCell>
								<TableCell
									align="center"
									className={classes.tableCell}>
									{item.trainID}
								</TableCell>
								<TableCell
									align="center"
									className={classes.tableCell}>
									{item.departure}
								</TableCell>
								<TableCell
									align="center"
									className={classes.tableCell}>
									{item.arrival}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

export default TrainList;
