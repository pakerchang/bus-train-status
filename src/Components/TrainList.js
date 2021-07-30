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
import request from "../requests";
import getAuthorizationHeader from "../apiKey";

function TrainList({ searchInfo }) {
	const [trainInfo, setTrainInfo] = useState([]);
	useEffect(() => {
		const reqURL = request(searchInfo).daily;

		// console.log("reqURL:  ", reqURL);

		axios
			.get(reqURL, { headers: getAuthorizationHeader() })
			.then((res) => setTrainInfo(res.data.TrainTimetables))
			.catch((error) => console.log(error));
	}, [searchInfo]);
	console.log("trainInfo: ", trainInfo);
	// 需要處理邏輯的資料
	// 行車順行逆行
	// StopTimes內的停靠順序決定區分投放處
	// 行駛時間計算

	return (
		<div className="trainList">
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align="center">車種車次</TableCell>
							<TableCell align="center">出發時間</TableCell>
							<TableCell align="center">抵達時間</TableCell>
							<TableCell align="center">行駛時間</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{trainInfo.map((item) => (
							<TableRow>
								<TableCell align="center">
									{item.TrainInfo.TrainTypeName.Zh_tw}
								</TableCell>
								<TableCell align="center">
									{item.StopTimes[0].DepartureTime}
								</TableCell>
								<TableCell align="center">
									{item.StopTimes[1].ArrivalTime}
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