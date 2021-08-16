/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { busAPI } from "../requests";
import { format, getMinutes, getSeconds } from "date-fns";
import axios from "axios";
import "./BusList.css";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core";
import getAuthorizationHeader from "../apiKey";

function BusList({ positionLat, positionLon, busRoute }) {
	const [data, setData] = useState([]);
	console.log("props :", positionLat, positionLon);

	useEffect(async () => {
		if (positionLat && positionLon && busRoute !== "") {
			const reqURL = busAPI(positionLat, positionLon);
			// console.log(reqURL);
			// get bus data
			await axios
				.get(reqURL, { headers: getAuthorizationHeader() })
				.then((res) => {
					console.log("busList: ", res.data);
					setData(res.data);
				})
				.catch((error) => console.log(error));
		}
	}, [positionLat, positionLon, busRoute]);

	const routeFilter = data.filter((item) =>
		busRoute.includes(item.RouteName.Zh_tw)
	);
	// console.log(routeFilter);

	const convertTime = (estimateTime) => {
		if (estimateTime < 60) {
			return estimateTime + "秒";
		} else {
			console.log(estimateTime);
			const min = Math.round(estimateTime / 60);
			// console.log(min);
			return min;
		}
	};

	const directionCheck = (direction) => {
		if (direction === 0) {
			return "去程";
		} else if (direction === 1) {
			return "返程";
		} else {
			return "";
		}
	};

	return (
		<div className="busList">
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align="center">起迄站</TableCell>
							<TableCell align="center">路線</TableCell>
							<TableCell align="center">目前站點</TableCell>
							<TableCell align="center">
								預估到站時間
							</TableCell>
							<TableCell align="center">方向</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{routeFilter.map((item) => (
							<TableRow>
								<TableCell align="center">
									{item.SubRouteName.Zh_tw}
								</TableCell>
								<TableCell align="center">
									{item.RouteName.Zh_tw}
								</TableCell>
								<TableCell align="center">
									{item.StopName.Zh_tw}
								</TableCell>
								{/* <TableCell align="center">站點</TableCell> */}
								<TableCell align="center">
									{item.PlateNumb === "-1"
										? "過站"
										: convertTime(item.EstimateTime) +
										  "分鐘"}
								</TableCell>
								<TableCell align="center">
									{directionCheck(item.Direction)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

export default BusList;
