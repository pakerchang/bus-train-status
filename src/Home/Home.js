import React from "react";
import { useState, useEffect } from "react";
import BusList from "../Component/BusList";
import TrainList from "../Component/TrainList";

import "./Home.css";

function Home() {
	const [trainOrigin, setTrainOrigin] = useState("");
	const [trainDestination, setTrainDestination] =
		useState("");
	const [busRoute, setBusRoute] = useState("");
	const [searchInfo, setSearchInfo] = useState([]);

	const trainOriginInput = (e) => {
		setTrainOrigin(e.target.value);
	};
	const trainDestinationInput = (e) => {
		setTrainDestination(e.target.value);
	};
	const busRouteInput = (e) => {
		setBusRoute(e.target.value);
	};

	// console.log(trainOrigin, trainDestination, busRoute);

	const searchButton = () => {
		const date = new Date()
			.toLocaleDateString()
			.replaceAll("/", "-");
		return setSearchInfo({
			date,
			trainOrigin,
			trainDestination,
			busRoute,
		});
	};
	return (
		<div className="home">
			<h1>火車及公車時刻表查詢</h1>
			<div className="home__search">
				<form action="" className="home__searchInfo">
					<div className="home__searchTrain">
						<h2>火車時刻表</h2>
						{/* <input type="date" placeholder="日期" /> */}
						<input
							className="home__trainStation"
							type="text"
							placeholder="出發站"
							onChange={trainOriginInput}
						/>
						<input
							className="home__trainStation"
							type="text"
							placeholder="抵達站"
							onChange={trainDestinationInput}
						/>
						<button
							className="searchBtn"
							onClick={searchButton}>
							查詢
						</button>
						{/* 顯示火車時刻表單 */}
						<TrainList
							date={searchInfo.date}
							trainOrigin={searchInfo.trainOrigin}
							trainDestination={searchInfo.trainDestination}
						/>
					</div>

					<div className="home__searchBus">
						<h2>公車時刻表</h2>
						<input
							type="text"
							placeholder="路線"
							onChange={busRouteInput}
						/>
						{/* 顯示公車時刻表單 */}
						<BusList busRoute={searchInfo.busRoute} />
					</div>
				</form>
			</div>
		</div>
	);
}

export default Home;
