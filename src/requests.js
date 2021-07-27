import getAuthorizationHeader from "./apiKey.js";

const requestTRA = ({
	OriginStation,
	DestinationStation,
	DateTime,
}) => {
    // 台鐵  取得指定[日期],[起迄站間]之站間時刻表資料
	return `https://ptx.transportdata.tw/MOTC/v3/Rail/TRA/DailyTrainTimetable/OD/${OriginStation}/to/${DestinationStation}/${DateTime}?$top=30&$format=JSON`;
};


// 台鐵火車時刻表
// /v2/Rail/TRA/LiveBoard/Station/{StationID}
// 取得指定[車站]列車即時到離站電子看板(動態前後30分鐘的車次)

// /v2/Rail/TRA/DailyTimetable/OD/{OriginStationID}/to/{DestinationStationID}/{TrainDate}

//

// 公車時刻表

// /v2/Bus/Schedule/City/{City}
// 取得指定[縣市]的市區公車路線班表資料
// https://ptx.transportdata.tw/MOTC?t=Bus&v=2#!/CityBus/CityBusApi_Schedule

// GET /v2/Bus/StopOfRoute/City/{City}/{RouteName}
// 取得指定[縣市],[路線名稱]的市區公車路線站序資料
// https://ptx.transportdata.tw/MOTC?t=Bus&v=2#!/CityBus/CityBusApi_StopOfRoute_1

// /v2/Bus/Stop/City/{City}
// 取得指定[縣市]的市區公車站牌資料
// https://ptx.transportdata.tw/MOTC?t=Bus&v=2#!/CityBus/CityBusApi_Stop
