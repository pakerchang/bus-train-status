import React, { useEffect } from "react";
// import TrainInfo from "../edit";

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

	useEffect(() => {
		const reqUrl = request(searchInfo).daily;
		// console.log(reqUrl);
		axios
			.get(reqUrl, { headers: getAuthorizationHeader() })
			.then((res) => console.log(res.data))
			.catch((error) => console.log(error));
	}, [searchInfo]);

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
							<TableCell align="center">車ㄨ種車次</TableCell>
							<TableCell align="center">出發時間</TableCell>
							<TableCell align="center">抵達時間</TableCell>
							<TableCell align="center">行駛時間</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{/* {trainInfo.map((item) => (
							<TableRow>
								<TableCell align="center">
									{item.trainType}
								</TableCell>
							</TableRow>
						))} */}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

export default TrainList;
