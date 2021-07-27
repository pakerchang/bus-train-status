import React from "react";
import { useState, useEffect } from "react";
import BusList from "../Component/BusList";
import TrainList from "../Component/TrainList";

import "./Home.css";

function Home() {
	return (
		<div className="home">
			<h1>火車及公車時刻表查詢</h1>
			<div className="home__search">
				<form action="" className="home__searchInfo">
					<div className="home__searchTrain">
						<h2>火車時刻表</h2>
						<input type="date" placeholder="日期" />
						<input
							className="home__trainStation"
							type="text"
							placeholder="出發站"
						/>
						<input
							className="home__trainStation"
							type="text"
							placeholder="抵達站"
						/>
						{/* 顯示火車時刻表單 */}
						<TrainList />
					</div>

					<div className="home__searchBus">
						<h2>公車時刻表</h2>
						<input type="text" placeholder="路線" />
						{/* 顯示公車時刻表單 */}
						<BusList />
					</div>
				</form>
			</div>
		</div>
	);
}

export default Home;
