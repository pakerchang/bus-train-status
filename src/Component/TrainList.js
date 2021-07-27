import React from "react";
import TrainInfo from "../edit";
import "./TrainList.css";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";

function TrainList({
	date,
	trainOrigin,
	trainDestination,
}) {
	const [trainInfo, setTrainInfo] = useState([]);
	useEffect(() => {
		setTrainInfo(TrainInfo);
	}, []);

	console.log(date, trainOrigin, trainDestination);

	return (
		<div className="trainList">
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align="center">車種車次</TableCell>
							<TableCell align="center">出發時間</TableCell>
							<TableCell align="center">抵達時間</TableCell>
							<TableCell align="center">行程時間</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{trainInfo.map((item) => (
							<TableRow>
								<TableCell align="center">
									{item.trainType}
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
