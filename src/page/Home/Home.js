import React, { useState } from "react";
import stationInfo from "../../json/StationInfo.json";
import "./Home.css";
import BusList from "../../Components/BusList";
import TrainList from "../../Components/TrainList";

function Home() {
	const [trainOrigin, setTrainOrigin] = useState("高雄");
	const [trainDestination, setTrainDestination] =
		useState("台南");
	const [city, setCity] = useState("");
	const [busRoute, setBusRoute] = useState("藍幹線");
	const [searchInfo, setSearchInfo] = useState([]);

	// 抓取當地時間f
	const date = new Date()
		.toLocaleDateString()
		.replaceAll("/", "-");

	const searchButton = (e) => {
		e.preventDefault();
		// 將車站名轉換成車站編號
		if (
			trainOrigin &&
			trainDestination &&
			busRoute !== ""
		) {
			const startStation = stationInfo.find((item) =>
				trainOrigin.includes(item.StationName.Zh_tw)
			);
			// 將車站名轉換成車站編號
			const endStation = stationInfo.find((item) =>
				trainDestination.includes(item.StationName.Zh_tw)
			);
			// console.log(startStation, endStation);
			// setTrainOrigin("");
			// setTrainDestination("");

			return setSearchInfo({
				originStation: startStation.StationID,
				destination: endStation.StationID,
				date: date,
				positionLat: endStation.StationPosition.PositionLat,
				positionLon: endStation.StationPosition.PositionLon,
				busRoute: busRoute,
			});
		} else {
			alert("請輸入站別或路線");
		}
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

						{/* 顯示火車時刻表單 */}
						<TrainList
							originStation={searchInfo.originStation}
							destination={searchInfo.destination}
							date={searchInfo.date}
						/>
					</div>
					<button
						className="searchBtn"
						onClick={searchButton}>
						查詢
					</button>
					<div className="home__searchBus">
						<h2>公車時刻表</h2>
						{/* select option */}
						<input
							type="text"
							placeholder="縣市"
							// onChange={(e) => setCity(e.target.value)}
						/>
						<input
							type="text"
							placeholder="路線"
							onChange={(e) => setBusRoute(e.target.value)}
						/>
						{/* 顯示公車時刻表單 */}
						<BusList
							// busRoute={searchInfo.busRoute}
							// city={searchInfo.city}
							// position={searchButton.busPosition}
							positionLat={searchInfo.positionLat}
							positionLon={searchInfo.positionLon}
							busRoute={searchInfo.busRoute}
						/>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Home;
