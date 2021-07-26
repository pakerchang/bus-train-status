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

function TrainList() {
	const [trainInfo, setTrainInfo] = useState([]);
	useEffect(() => {
		setTrainInfo(TrainInfo);
	}, []);
	return (
		<div className="trainList">
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>車種車次</TableCell>
							<TableCell>出發時間</TableCell>
							<TableCell>抵達時間</TableCell>
							<TableCell>行程時間</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{trainInfo.map((item) => (
							<TableRow>
								<TableCell>{item.trainType}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

export default TrainList;
