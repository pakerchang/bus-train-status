import React from "react";
import ReactDOM from "react-dom";
import Home from "./page/Home/Home.js";
import "./index.css";
import BackToTop from "./BackToTop.js";
// import Bus from "./page/Taichung/Bus.js";

ReactDOM.render(
	<React.StrictMode>
		<Home />
		{/* <BackToTop /> */}
		{/* <Bus /> */}
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
