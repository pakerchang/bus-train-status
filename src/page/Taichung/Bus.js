/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./Bus.css";
import { taichungBus } from "../../requests";
import getAuthorizationHeader from "../../apiKey";
import axios from "axios";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core";

function Bus() {
	const [routeInput, setRouteInput] = useState("綠1");
	const [originInput, setOriginInput] =
		useState("北新國中");
	const [destinationInput, setDestinationInput] =
		useState("中山國中");
	const [data, setData] = useState([]);
	const [filterData, setFilterData] = useState([]);

	const fetchData = async () => {
		const reqURL = taichungBus(routeInput);
		await axios
			.get(reqURL, { headers: getAuthorizationHeader() })
			.then((res) => {
				console.log("raw:", res.data);
				setData(res.data);
			})
			.catch((err) => console.log(err));
	};

	const searchBtn = (e) => {
		e.preventDefault();
		if (
			routeInput &&
			originInput &&
			destinationInput !== ""
		) {
			fetchData();
		} else {
			alert("請輸入站別或路線");
		}
	};

	useEffect(() => {
		// rename Object
		const station = data.map((item) => {
			// 解 Stops Array
			return item.Stops.map((stops, index) => {
				return {
					id: stops.StopID,
					order: index,
					stationName: stops.StopName.Zh_tw,
					timeTables: stops.TimeTables,
				};
			});
			// const schedule = item.Stops.map((stops, index) => ({
			// 	id: stops.StopID,
			// 	order: index,
			// 	stationName: stops.StopName.Zh_tw,
			// 	timeTables: stops.TimeTables,
			// }));
			// return {
			// 	routeName: item.RouteName.Zh_tw,
			// 	destinationID: item.DestinationStopID,
			// 	destinationStationName:
			// 		item.DestinationStopName.Zh_tw,
			// 	schedule,
			// };
		});
		console.log("station: ", station);
		// console.log("flat: ", station.flat(2));
		setFilterData(
			station.map((item) => {
				//挑出起迄站
				const departStation = item.find((match) =>
					originInput.includes(match.stationName)
				);
				const destinationStation = item.find((match) =>
					destinationInput.includes(match.stationName)
				);
				const endStation = item[item.length - 1];
				return {
					departStation,
					destinationStation,
					endStation,
				};
			})
		);

		filterData.forEach((item) => console.log('item: ',item));

		// setFilterData(pick);
		// const pick = station.map((item) => {
		// 	//挑出起迄站
		// 	const departStation = item.schedule.find((match) =>
		// 		originInput.includes(match.stationName)
		// 	);
		// 	const destinationStation = item.schedule.find(
		// 		(match) =>
		// 			destinationInput.includes(match.stationName)
		// 	);
		// 	return { departStation, destinationStation };
		// });

		// setFilterData(pick);

		// setFilterData(
		// 	pick.find(
		// 		(item) =>
		// 			item.departStation.order <
		// 			item.destinationStation.order
		// 	)
		// );
		// 過濾掉多餘的空陣列
		// setFilterData(pick.filter((item) => item.length > 0));
	}, [data]);

	console.log("filter: ", filterData);
	return (
		<div className="bus">
			<h1>台中公車時刻表查詢</h1>
			<form className="bus__searchForm">
				<div className="bus__searchContainer">
					<input
						className="bus__routeName"
						type="text"
						placeholder={"路線"}
						value={routeInput}
						onChange={(e) => setRouteInput(e.target.value)}
					/>

					<input
						className="bus__origin"
						type="text"
						placeholder="出發站"
						value={originInput}
						onChange={(e) => setOriginInput(e.target.value)}
					/>

					<input
						className="bus__destination"
						type="text"
						placeholder="抵達站"
						value={destinationInput}
						onChange={(e) =>
							setDestinationInput(e.target.value)
						}
					/>

					<button
						className="bus__searchBtn"
						onClick={searchBtn}>
						Go
					</button>

					<TableContainer>
						<Table aria-label="collapsible table">
							<TableHead>
								<TableRow>
									<TableCell>路線</TableCell>
									<TableCell>起點站</TableCell>
									<TableCell>發車時間</TableCell>
									<TableCell>目的地</TableCell>
									<TableCell>抵達時間</TableCell>
									<TableCell>終點站</TableCell>
								</TableRow>
							</TableHead>
							<TableBody></TableBody>
						</Table>
					</TableContainer>
				</div>
			</form>
		</div>
	);
}

export default Bus;

// {filterData.forEach((item) => {
// 									// const timeTables = item.departStation.timeTables.map(times=> ({}))
// 									return (
// 										<TableRow>
// 											{/* <TableCell>{item.routeName}</TableCell> */}
// 											<TableCell>
// 												{/* {item[0].stationName} */}
// 											</TableCell>
// 											<TableCell>
// 												{/* {time[0].arrivalTime} */}
// 											</TableCell>
// 											<TableCell>
// 												{/* {item[1].stationName} */}
// 											</TableCell>
// 											<TableCell>抵達時間</TableCell>
// 											<TableCell>終點站</TableCell>
// 										</TableRow>
// 									);
// 								})}
