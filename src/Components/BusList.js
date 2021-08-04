import React, { useEffect, useState } from "react";
import { busAPI } from "../requests";
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

	// get bus data
	const fetchData = async () => {
		const reqURL = busAPI(positionLat, positionLon);
		// console.log(reqURL);
		await axios
			.get(reqURL, { headers: getAuthorizationHeader() })
			.then((res) => setData(res.data))
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		fetchData();
		console.log("fetchData :", data);
	}, [positionLat, positionLon, busRoute]);
	
	// const routeFilter = data.filter((item) =>
	// 	[busRoute].includes(item.RouteName)
	// );
	const routeFilter = data.filter((item) =>
		busRoute.includes(item.RouteName.Zh_tw)
	);
	// console.log("filter :", busRoute);
	console.log(routeFilter);
	return (
		<div className="busList">
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align="center">路線</TableCell>
							<TableCell align="center">預估到站</TableCell>
							<TableCell align="center">方向</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							{/* <TableCell align="center"></TableCell> */}
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

export default BusList;
