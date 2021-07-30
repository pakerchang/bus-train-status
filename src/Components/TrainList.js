import React, { useEffect, useState } from "react";
import trainTypeCode from "../json/trainType.json";
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
import request from "../requests";
import getAuthorizationHeader from "../apiKey";

function TrainList({ searchInfo }) {
	const [data, setData] = useState([]);
	useEffect(() => {
		const reqURL = request(searchInfo).daily;

		// console.log("reqURL:  ", reqURL);

		axios
			.get(reqURL, { headers: getAuthorizationHeader() })
			.then((res) => setData(res.data.TrainTimetables))
			.catch((error) => console.log(error));
	}, [searchInfo]);

	const trainInfo = data.map((item) => ({
		// trainType: item.TrainInfo.TrainTypeCode,
		trainID: item.TrainInfo.TrainNo,
		trainType: item.TrainInfo.TrainTypeName.Zh_tw,
		departure: item.StopTimes[0].DepartureTime,
		arrival: item.StopTimes[1].ArrivalTime,
	}));

	// console.log(trainInfo.map((item) => item.trainType));
	// const replaceTrainType = () => {
	// 	trainTypeCode.find((code) => {
	// 		trainInfo.TrainInfo.TrainTypeCode.includes(
	// 			code.TypeCode
	// 		);
	// 	});
	// };

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
									{item.trainType}
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
