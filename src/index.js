import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./page/Home/Home.js";
import BackToTop from "./BackToTop.js";
import TrainLiveStation from "./Components/TrainLiveStation.js";
import { BrowserRouter as Router, Switch } from "react-router-dom";
// import Bus from "./page/Taichung/Bus.js";

ReactDOM.render(
	<React.StrictMode>
		<Router>
			{/* <Home /> */}
			<TrainLiveStation />
			{/* <BackToTop /> */}
			{/* <Bus /> */}
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
