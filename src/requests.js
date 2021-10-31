const trainAPI = (originStation, destination, date) => {
	// 火車時刻表（起點=>終點)
	return `https://ptx.transportdata.tw/MOTC/v3/Rail/TRA/DailyTrainTimetable/OD/${originStation}/to/${destination}/${date}?$format=JSON`;
};

const trainLiveStation = (stationID) => {
	// 火車車站誤點狀況
	return `https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/LiveBoard/Station/${stationID}?$format=JSON
`;
};

const busAPI = (positionLat, positionLon) => {
	// 公車站牌查詢（經緯度）
	return `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/NearBy?$select=PlateNumb%2CStopID%2CStopName%2CRouteID%2C%20RouteName%2C%20SubRouteID%2C%20SubRouteName%2C%20Direction%2C%20EstimateTime%2C%20StopStatus%2C%20NextBusTime&$spatialFilter=nearby(${positionLat},${positionLon},500)&$format=JSON`;
};

const taichungBus = (routeName) => {
	// 公車路線查詢
	return `https://ptx.transportdata.tw/MOTC/v2/Bus/DailyStopTimeTable/City/Taichung/${routeName}?$format=JSON`;
};

const busOperator = (cityName) => {
	// 公車查詢（縣市）
	return `https://ptx.transportdata.tw/MOTC/v2/Bus/Operator/City/${cityName}?$select=OperatorID%2COperatorName&$format=JSON`;
};

export { trainAPI, trainLiveStation, busAPI, taichungBus, busOperator };
