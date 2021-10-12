/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
// files
import stationInfo from "../../json/stationInfo.json";
import "./Home.css";
//date
import { format } from "date-fns";
// component
// import BusList from "../../Components/BusList";
// import TrainList from "../../Components/TrainList";
// train list component
import axios from "axios";
import { trainAPI } from "../../requests";
import getAuthorizationHeader from "../../apiKey";
// material-ui
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Fab,
	makeStyles,
	useScrollTrigger,
	Zoom,
	CircularProgress,
	AppBar,
	Toolbar,
	Button,
	Typography,
	IconButton,
} from "@material-ui/core";
import { Search, ArrowRightAlt, Train, KeyboardArrowUp, Menu } from "@material-ui/icons";
import { green } from "@material-ui/core/colors";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropTypes from "prop-types";

export default function Home(scrollTarget) {
	// Train input
	const [trainOriginInput, setTrainOriginInput] = useState(null);
	const [trainDestinationInput, setTrainDestinationInput] = useState(null);
	// Bus input
	// const [city, setCity] = useState("");
	// const [busRoute, setBusRoute] = useState("藍幹線");
	const classes = useStyles();
	// 抓取當地時間
	const date = format(new Date(), "yyyy-MM-dd");
	// Progress Component
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(true);
	//train list component
	const [rawData, setRawData] = useState([]);
	const [outputData, setOutputData] = useState();
	const buttonClassName = clsx({
		[classes.buttonSuccess]: success,
	});

	const fetchData = async (originStation, endStation) => {
		const reqURL = trainAPI(originStation, endStation, date);
		await axios
			.get(reqURL, {
				headers: getAuthorizationHeader(),
			})
			.then((res) => {
				console.log("raw: ", res.data);
				setRawData(res.data.TrainTimetables);
			})
			.catch((error) => console.log(error));
	};

	const searchBtn = () => {
		if (
			!loading &&
			trainOriginInput !== null &&
			trainDestinationInput !== null &&
			trainOriginInput !== trainDestinationInput
		) {
			// fabProgress Component animation start
			setSuccess(false);
			setLoading(true);
			// 將車站名轉換成車站編號
			const startStation = stationInfo.find((item) => trainOriginInput.includes(item.StationName.Zh_tw));
			// 將車站名轉換成車站編號
			const endStation = stationInfo.find((item) => trainDestinationInput.includes(item.StationName.Zh_tw));
			fetchData(startStation.StationID, endStation.StationID);
		} else {
			alert("請輸入或確認站別");
		}
	};

	// input icon control
	useEffect(() => {
		if (trainOriginInput !== null && trainDestinationInput !== null) {
			setSuccess(true);
		} else {
			setSuccess(false);
		}
	}, [trainDestinationInput, trainOriginInput]);

	// train list component
	useEffect(() => {
		if (rawData.length !== 0) {
			const station = rawData.map((item) => {
				return {
					trainID: item.TrainInfo.TrainNo,
					trainTypeCode: item.TrainInfo.TrainTypeCode,
					originStationName: item.TrainInfo.StartingStationName.Zh_tw,
					endStationName: item.TrainInfo.EndingStationName.Zh_tw,
					trainType: item.TrainInfo.TrainTypeName.Zh_tw,
					direction: item.TrainInfo.Direction,
					departure: item.StopTimes[0].DepartureTime,
					arrival: item.StopTimes[1].ArrivalTime,
				};
			});
			setOutputData(
				station.sort((first, second) => {
					setLoading(false);
					setSuccess(false);
					return first.departure.localeCompare(second.departure);
				})
			);
		} else {
			setLoading(false);
			setSuccess(false);
		}
	}, [rawData]);
	// console.log("output: ", outputData);

	return (
		<div className={classes.home}>
			<AppBar className={classes.appBar}>
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<Menu />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						火車時刻表查詢
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
			<div className="home__search">
				<form action="" className="home__searchInfo">
					<div className={classes.progressRoot}>
						<Autocomplete
							autoSelect
							autoComplete
							autoHighlight
							value={trainOriginInput}
							onChange={(e, newValue) => {
								setTrainOriginInput(newValue);
							}}
							options={stationInfo.map((option) => option.StationName.Zh_tw)}
							style={{ width: 170, padding: "0px 25px" }}
							renderInput={(params) => <TextField {...params} label="出發站" variant="outlined" />}
						/>

						<div className={classes.progressWrapper}>
							<Fab aria-label="search" color="primary" className={buttonClassName} onClick={searchBtn}>
								{success ? <Search /> : <ArrowRightAlt />}
							</Fab>
							{loading && <CircularProgress size={68} className={classes.fabProgress} />}
						</div>

						<Autocomplete
							autoSelect
							autoComplete
							autoHighlight
							value={trainDestinationInput}
							onChange={(e, newValue) => {
								setTrainDestinationInput(newValue);
							}}
							options={stationInfo.map((option) => option.StationName.Zh_tw)}
							style={{ width: 170, padding: "0px 25px" }}
							renderInput={(params) => <TextField {...params} label="終點站" variant="outlined" />}
						/>
					</div>

					<div className="trainList">
						{outputData === undefined || rawData.length === 0 ? (
							<h3>無資料</h3>
						) : (
							<TableContainer>
								<Table className={classes.tableRoot}>
									<TableHead id="back-to-top-anchor">
										<TableRow>
											<TableCell className={classes.tableHeadCell} align="center">
												<div className={classes.textDiv} style={{marginLeft:'15px'}}>
													車種車次 (始發站 <ArrowRightAlt /> 終點站)
												</div>
											</TableCell>
											<TableCell className={classes.tableHeadCell} align="center">
												車次
											</TableCell>
											<TableCell className={classes.tableHeadCell} align="center">
												出發時間
											</TableCell>
											<TableCell className={classes.tableHeadCell} align="center">
												抵達時間
											</TableCell>
											<TableCell className={classes.tableHeadCell} align="center">
												行駛方向
											</TableCell>
											{/* <TableCell align="center">
												行駛時間
											</TableCell> */}
										</TableRow>
									</TableHead>
									<TableBody>
										{outputData.map((item) => {
											return (
												<TableRow key={item.trainID}>
													<TableCell align="left" className={classes.tableCell}>
														<div className={classes.textDiv}>
															<CustomTrainIcon color={item.trainTypeCode} />
															{item.trainType.replace(/\([^()]*\)/g, "")} ({item.originStationName} <ArrowRightAlt />{" "}
															{item.endStationName})
														</div>
													</TableCell>
													<TableCell align="center" className={classes.tableCell}>
														{item.trainID}
													</TableCell>
													<TableCell align="center" className={classes.tableCell}>
														{item.departure}
													</TableCell>
													<TableCell align="center" className={classes.tableCell}>
														{item.arrival}
													</TableCell>
													<TableCell align="center" className={classes.tableCell}>
														{item.direction === 1 ? "南下" : "北上"}
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							</TableContainer>
						)}
					</div>
				</form>
				<ScrollTop {...scrollTarget}>
					<Fab color="primary" size="large" aria-label="scroll back to top">
						<KeyboardArrowUp />
					</Fab>
				</ScrollTop>
				{/* <div className="home__searchBus">
						<h2>公車時刻表</h2> */}
				{/* select option */}
				{/* <input
							type="text"
							placeholder="縣市"
							onChange={(e) => setCity(e.target.value)}
						/>
						<input
							type="text"
							placeholder="路線"
							onChange={(e) => setBusRoute(e.target.value)}
						/> */}
				{/* 顯示公車時刻表單 */}
				{/* <BusList
							// city={searchInfo.city}
							positionLat={searchInfo.positionLat}
							positionLon={searchInfo.positionLon}
							busRoute={searchInfo.busRoute}
						/> */}
				{/* </div> */}
			</div>
		</div>
	);
}

const ScrollTop = (scrollTarget) => {
	const classes = useStyles();
	const { children, window } = scrollTarget;
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	});
	// console.log("trigger: ", trigger);
	const handleClick = (e) => {
		const anchor = (e.target.ownerDocument || document).querySelector("#back-to-top-anchor");
		if (anchor) {
			anchor.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};
	return (
		<Zoom in={!trigger}>
			<div onClick={handleClick} role="presentation" className={classes.backToTopRoot}>
				{children}
			</div>
		</Zoom>
	);
};
ScrollTop.propTypes = {
	children: PropTypes.element.isRequired,
	window: PropTypes.func,
};

const CustomTrainIcon = (props) => {
	const { color, ...other } = props;
	const classes = useStyles(props);
	return <Train className={classes.trainIcon} {...other} />;
};

const useStyles = makeStyles((theme) => ({
	home: {
		textAlign: "center",
		backgroundColor: "#dadbd3",
		height: "100vh",
		overflowY: "scroll",
		flexGrow: 1,
		"& h3": {
			marginTop: "50px",
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	appBar: {
		marginBottom: "40px",
	},
	progressRoot: {
		marginTop: "90px",
		display: "flex",
		alignItems: "center",
	},
	progressWrapper: {
		margin: theme.spacing(1),
		position: "relative",
	},
	fabProgress: {
		color: green[500],
		position: "absolute",
		top: -6,
		left: -6,
		zIndex: 1,
	},
	buttonSuccess: {
		backgroundColor: "primary",
	},
	trainInput: {
		borderRadius: 15,
		padding: 10,
		marginRight: 5,
		"&:focus": {
			outline: "none",
		},
	},
	tableRoot: {
		backgroundColor: "#A9A9A9",
		marginTop: "35px",
		borderRadius: 15,
		padding: "25px 35px",
	},
	tableHeadCell: {
		fontSize: "16px",
		padding: "20px 20px",
		fontFamily: ["Saira Condensed", "sans-serif"],
	},
	tableCell: {
		backgroundColor: "#fff",
		padding: "20px 30px",
		fontSize: "18px",
		fontFamily: ["Saira Condensed", "sans-serif"],
	},
	textDiv: {
		display: "flex",
		justifyItems: "center",
	},
	trainIcon: {
		color: (props) => {
			switch (props.color) {
				case "1":
					return "#ff5000";
					break;
				case "2":
					return "#d00216";
					break;
				case "3":
					return "#ff8708";
					break;
				case "4":
					return "#ffd200";
					break;
				case "5":
					return "#00ace8";
					break;
				case "6":
					return "#0072B5";
					break;
				case "7":
					return "#a9a9a9";
					break;
				case "10":
					return "#00bfff";
					break;
				default:
					return console.log("SwitchColor Identify Error");
					break;
			}
		},
		marginRight: 10,
	},
	backToTopRoot: {
		position: "fixed",
		bottom: theme.spacing(3),
		right: theme.spacing(3),
	},
}));
