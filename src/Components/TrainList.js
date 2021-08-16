/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./TrainList.css";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core";
import axios from "axios";
import { trainAPI } from "../requests";
import getAuthorizationHeader from "../apiKey";

function TrainList({ originStation, destination, date }) {
	const [data, setData] = useState([]);

	useEffect(async () => {
		if (originStation && destination && date !== "") {
			const reqURL = trainAPI(
				originStation,
				destination,
				date
			);
			// console.log("reqURL:  ", reqURL);
			await axios
				.get(reqURL, { headers: getAuthorizationHeader() })
				.then((res) => {
					console.log(res.data);
					setData(res.data.TrainTimetables);
				})
				.catch((error) => console.log(error));
		}
	}, [originStation, destination, date]);

	const trainInfo = data.map((item) => ({
		trainID: item.TrainInfo.TrainNo,
		trainType: item.TrainInfo.TrainTypeName.Zh_tw,
		departure: item.StopTimes[0].DepartureTime,
		arrival: item.StopTimes[1].ArrivalTime,
	}));
	// 需要處理邏輯的資料
	// 行車順行逆行
	// 行駛時間計算
	// 修改車種名稱

	//排序
	trainInfo.sort((first, second) => {
		return first.departure.localeCompare(second.departure);
	});

	return (
		<div className="trainList">
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align="center">車種車次</TableCell>
							<TableCell align="center">車次</TableCell>
							<TableCell align="center">出發時間</TableCell>
							<TableCell align="center">抵達時間</TableCell>
							{/* <TableCell align="center">行駛時間</TableCell> */}
						</TableRow>
					</TableHead>
					<TableBody>
						{trainInfo.map((item) => (
							<TableRow>
								<TableCell align="center">
									{item.trainType.replace(
										/\([^()]*\)/g,
										""
									)}
								</TableCell>
								<TableCell align="center">
									{item.trainID}
								</TableCell>
								<TableCell align="center">
									{item.departure}
								</TableCell>
								<TableCell align="center">
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
