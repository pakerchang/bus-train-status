/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./Bus.css";
import { busOperator, taichungBus } from "../../requests";
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
	const [cityInput, setCityInput] = useState("Taichung");
	const [routeInput, setRouteInput] = useState("綠1");
	const [originInput, setOriginInput] =
		useState("北新國中");
	const [destinationInput, setDestinationInput] =
		useState("中山國中");
	const [data, setData] = useState([]);
	const [operator, setOperator] = useState([]);
	const [outputData, setOutputData] = useState();

	const fetchData = async () => {
		const reqURL = taichungBus(routeInput);
		const operatorURL = busOperator(cityInput);
		await axios
			.get(reqURL, { headers: getAuthorizationHeader() })
			.then((res) => {
				// console.log("raw:", res.data);
				setData(res.data);
			})
			.catch((err) => console.log(err));

		await axios
			.get(operatorURL, {
				headers: getAuthorizationHeader(),
			})
			.then((res) => {
				console.log("operatorData: ", res.data);
				setOperator(res.data);
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
			return item.Stops.map((stopsArray, index) => {
				const result = stopsArray.TimeTables.map(
					(timeArray) => {
						return {
							routeName: item.RouteName.Zh_tw,
							stopID: stopsArray.StopID,
							stationName: stopsArray.StopName.Zh_tw,
							endStation: item.DestinationStopName.Zh_tw,
							departTime: timeArray.ArrivalTime,
						};
					}
				);
				return {
					order: index,
					id: item.OperatorID,
					stationName: stopsArray.StopName.Zh_tw,
					result,
				};
			});
		});
		// console.log("station: ", station);

		// pick operator name
		const matchOperatorName = () => {
			const tmp = operator.filter((item) => {
				return item.OperatorID === "19";
			});
			console.log("matchOperatorName: ", tmp);
			return tmp;
		};
		// console.log("operatorName: ", matchOperatorName);
		//挑出起迄站
		const findStation = station.map((item) => {
			const departStation = item.find((match) =>
				originInput.includes(match.stationName)
			);
			const destinationStation = item.find((match) =>
				destinationInput.includes(match.stationName)
			);
			return { departStation, destinationStation };
		});
		// console.log("findstation: ", findStation);
		matchOperatorName(findStation.id);

		setOutputData(
			findStation.find((item) => {
				return (
					item.departStation.order <
					item.destinationStation.order
				);
			})
		);
	}, [data, setOutputData]);
	console.log("output: ", outputData);

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

					{outputData === undefined ? (
						//防止頁面載入時提前render
						<h3 className="bus__userTips">
							因功能未完善，請完整輸入站牌及路線名稱，ex:
							路線：14副2 、 站牌名： 四張犁(昌平路)
						</h3>
					) : (
						<TableContainer>
							<Table aria-label="collapsible table">
								<TableHead>
									<TableRow>
										<TableCell align="center">
											路線
										</TableCell>
										<TableCell align="center">
											客運
										</TableCell>
										<TableCell align="center">
											起點站
										</TableCell>
										<TableCell align="center">
											發車時間
										</TableCell>
										<TableCell align="center">
											目的地
										</TableCell>
										<TableCell align="center">
											抵達時間
										</TableCell>
										<TableCell align="center">
											終點站
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{outputData.departStation.result.map(
										// 利用departStation idex 連帶將 destinationStation 的資料一同 map 出來
										(departItem, idx) => (
											<TableRow>
												<TableCell align="center">
													{departItem.routeName}
												</TableCell>
												<TableCell align="center">
													客運
												</TableCell>
												<TableCell align="center">
													{departItem.stationName}
												</TableCell>
												<TableCell align="center">
													{departItem.departTime}
												</TableCell>
												<TableCell align="center">
													{
														outputData.destinationStation
															.result[idx].stationName
													}
												</TableCell>
												<TableCell align="center">
													{
														outputData.destinationStation
															.result[idx].departTime
													}
												</TableCell>
												<TableCell align="center">
													{
														outputData.destinationStation
															.result[idx].endStation
													}
												</TableCell>
											</TableRow>
										)
									)}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</div>
			</form>
		</div>
	);
}

export default Bus;
