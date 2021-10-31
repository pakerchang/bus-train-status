import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./page/Home/Home.js";
import TrainLiveStation from "./page/TrainLiveBoard/TrainLiveStation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Bus from "./page/Taichung/Bus.js";
// import BackToTop from "./BackToTop.js";

ReactDOM.render(
	<React.StrictMode>
		<Router basename={process.env.PUBLIC_URL}>
			<Switch>
				<Route path="/Bus" component={Bus} />
				<Route path="/LiveStation" component={TrainLiveStation} />
				<Route path="/" component={Home} />
			</Switch>

			{/* <BackToTop /> */}
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
