const SALES_DATA = [
	{
		region: "North",
		s_t: 325000,
		h_1: 550000,
		e_g: 350000,
		h_b: 300000,
	},
	{
		region: "East",
		s_t: 400000,
		h_1: 500000,
		e_g: 450000,
		h_b: 350000,
	},
	{
		region: "South",
		s_t: 350000,
		h_1: 400000,
		e_g: 500000,
		h_b: 325000,
	},
	{
		region: "West",
		s_t: 600000,
		h_1: 350000,
		e_g: 550000,
		h_b: 500000,
	},
];

//兔兔版
const result = SALES_DATA.map((data) => {
	const ascending = Object.entries(data)
		.filter((item) => typeof item[1] !== "string")
		.sort((itemA, itemB) => itemA[1] - itemB[1]);

	const descending = Object.entries(data)
		.filter((item) => typeof item[1] !== "string")
		.sort((itemA, itemB) => itemB[1] - itemA[1]);

	return {
		region: data.region,
		lowest: ascending[0],
		highest: descending[0],
		sorted: {
			asc: ascending,
			desc: descending,
		},
	};
});
console.log("result:", result);

// SAN版
const LH = SALES_DATA.map((data) => {
	const temp = Object.entries(data).reduce(
		(acc, i) => {
			if (i[1] > acc.max[1]) {
				acc.max = i;
			} else if (i[1] < acc.min[1]) {
				acc.min = i;
			}
			return acc;
		},
		{ max: [, -Infinity], min: [, Infinity] }
	);
	return [temp.max, temp.min];
});

console.log("LH: ", LH);

// Object.values(outputData).map((getArray) => {
// 	return getArray.result.map((item) => {
// 		console.log(item);
// 		return (
// 			<TableRow align="center">
// 				<TableCell align="center">
// 					{item.routeName}
// 				</TableCell>
// 				<TableCell align="center">
// 					{item.stationName}
// 				</TableCell>
// 				<TableCell align="center">
// 					{item.departTime}
// 				</TableCell>
// 				<TableCell align="center">目的地</TableCell>
// 				<TableCell align="center">抵達時間</TableCell>
// 				<TableCell align="center">終點站</TableCell>
// 			</TableRow>
// 		);
// 	});
// });
