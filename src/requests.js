const trainAPI = (originStation, destination, date) => {
	return `https://ptx.transportdata.tw/MOTC/v3/Rail/TRA/DailyTrainTimetable/OD/${originStation}/to/${destination}/${date}?$format=JSON`;
};

const busAPI = (positionLat, positionLon) => {
	return `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/NearBy?$select=PlateNumb%2CStopID%2CStopName%2CRouteID%2C%20RouteName%2C%20SubRouteID%2C%20SubRouteName%2C%20Direction%2C%20EstimateTime%2C%20StopStatus%2C%20NextBusTime&$spatialFilter=nearby(${positionLat},${positionLon},500)&$format=JSON`;
};

const taichungBus = (routeName) => {
	return `https://ptx.transportdata.tw/MOTC/v2/Bus/DailyStopTimeTable/City/Taichung/${routeName}?$select=RouteID%2C%20RouteName%2C%20SubRouteName%2C%20DestinationStopID%2C%20DestinationStopName%2CStops&$format=JSON`;
};

export { trainAPI, busAPI, taichungBus };
