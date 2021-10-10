import React from "react";

import PropTypes from "prop-types";

import Toolbar from "@material-ui/core/Toolbar";

import { makeStyles } from "@material-ui/core/styles";

import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";

const useStyles = makeStyles((theme) => ({
	backToTopRoot: {
		position: "fixed",
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
}));

function ScrollTop(props) {
	const { children, window } = props;
	const classes = useStyles();
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	});
	console.log("trigger: ", trigger);
	const handleClick = (event) => {
		const anchor = (event.target.ownerDocument || document).querySelector("#back-to-top-anchor");
		if (anchor) {
			anchor.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	return (
		<Zoom in={trigger}>
			<div onClick={handleClick} role="presentation" className={classes.backToTopRoot}>
				{children}
			</div>
		</Zoom>
	);
}

ScrollTop.propTypes = {
	children: PropTypes.element.isRequired,
	window: PropTypes.func,
};

export default function BackToTop(props) {
	const [showResults, setShowResults] = React.useState(false);
	const ontClick = () => setShowResults(true);

	return (
		<React.Fragment>
			<div id="back-to-top-anchor" />
			<input type="submit" value="Search" onClick={ontClick} />
			{showResults ? <Results /> : null}
			<ScrollTop {...props}>
				<Fab color="primary" size="large" aria-label="scroll back to top">
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</React.Fragment>
	);
}

const Results = () => (
	<div id="results" className="search-results">
		<p>
			{[...new Array(60)]
				.map(
					() => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
				)
				.join("\n")}
		</p>
	</div>
);
