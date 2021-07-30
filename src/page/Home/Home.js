import React, { useState } from "react";
import BusList from "../../Components/BusList";
import TrainList from "../../Components/TrainList";
import stationList from "../../json/StationList.json";
import "./Home.css";

function Home() {
	const [trainOrigin, setTrainOrigin] = useState("");
	const [trainDestination, setTrainDestination] =
		useState("");
	const [busRoute, setBusRoute] = useState("");
	const [searchInfo, setSearchInfo] = useState([]);

	// get local date
	const date = new Date()
		.toLocaleDateString()
		.replaceAll("/", "-");

	const searchButton = (e) => {
		e.preventDefault();
		// setTrainOrigin("");
		// setTrainDestination("");

		const startStation = stationList.find((item) =>
			trainOrigin.includes(item.stationNameTW)
		);
		const endStation = stationList.find((item) =>
			trainDestination.includes(item.stationNameTW)
		);

		return setSearchInfo({
			originStation: startStation.stationID,
			destinationStation: endStation.stationID,
			date: date,
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
							value={trainOrigin}
							onChange={(e) =>
								setTrainOrigin(e.target.value)
							}
						/>
						<input
							className="home__trainStation"
							type="text"
							placeholder="抵達站"
							value={trainDestination}
							onChange={(e) =>
								setTrainDestination(e.target.value)
							}
						/>
						<button
							className="searchBtn"
							onClick={searchButton}>
							查詢
						</button>
						{/* 顯示火車時刻表單 */}
						<TrainList searchInfo={searchInfo} />
					</div>

					<div className="home__searchBus">
						<h2>公車時刻表</h2>
						<input
							type="text"
							placeholder="路線"
							onChange={(e) => setBusRoute(e.target.value)}
						/>
						顯示公車時刻表單
						<BusList />
					</div>
				</form>
			</div>
		</div>
	);
}

export default Home;
