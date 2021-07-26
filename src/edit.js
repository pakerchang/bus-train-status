

// const trainStationName = require("./json/StationList.json");
const trainSchedule = require("./json/trainSchedule.json");

// 過濾掉不是區間或區間快的車種
const finalItems = trainSchedule.TrainInfo.filter((item) =>
	["1132"].includes(item.CarClass)
);

const trainInfo = finalItems.map((item) => ({
	type: item.Type, //列車型態
	train: item.Train, //車次編號
	daily: item.Everyday, // 每日行駛
	lineDir: item.LineDir, // 順行逆行 1為南下 0為北上
	trainType: item.CarClass, // 車種
	timeInfo: item.TimeInfos, // 班次時間、站點等資料
}));
// console.log(trainInfo);
export default trainInfo;
