import React, { useState, useEffect } from "react";
import { Modal, Avatar, Menu, MenuItem, AppBar, Toolbar, Typography, IconButton, makeStyles } from "@material-ui/core";
import { GitHub, EmailRounded, AccountCircleRounded } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { googleLoginKey } from "../apiKey";

export default function Header() {
	const classes = useStyles();
	const [login, setLogin] = useState(false);
	const [userProfile, setUserProfile] = useState([]);
	const [handleModal, setHandleModal] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [loginMenu, setLoginMenu] = useState(null);

	// menu controller
	const menuClick = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const loginMenuClick = (e) => {
		setLoginMenu(e.currentTarget);
	};

	// modal controller
	const modalOpen = () => {
		setHandleModal(true);
	};
	const modalClose = () => {
		setHandleModal(false);
	};

	const menuClose = (props) => () => {
		switch (props) {
			case "github":
				window.location.href = "https://github.com/pakerchang";
				setAnchorEl(null);
				break;
			case "sourceCode":
				window.location.href = "https://github.com/pakerchang/bus-train-status";
				setAnchorEl(null);
				break;
			case "mail":
				window.location.href = "mailto:pakerchang.projectTrain-bus-status@gmail.com";
				break;
			case "loginMenu":
				setLoginMenu(null);
				break;
			default:
				setAnchorEl(null);
				break;
		}
	};

	const responseGoogleLogin = (res) => {
		setLogin(true);
		if (res) {
			setUserProfile(res.profileObj);
			localStorage.setItem("lastUser", JSON.stringify(res.profileObj));
		}
		console.log(res);
	};
	const responseGoogleLogout = (res) => {
		localStorage.clear();
		setLoginMenu(null);
		setLogin(false);
		setHandleModal(false);
		console.log("logout", res);
	};

	// console.log("user profile", userProfile);

	const modalBody = (
		<div className={classes.modalPaper}>
			<GoogleLogin clientId={googleLoginKey} onSuccess={responseGoogleLogin} onFailure={responseGoogleLogin} />
		</div>
	);

	useEffect(() => {
		if (localStorage.length === 0) {
			setLogin(false);
		} else {
			setLogin(true);
			setUserProfile(localStorage.getItem("lastUser"));
			console.log("userProfile Set");
		}
	}, []);

	return (
		<div className="Header">
			<AppBar className={classes.appBar}>
				<Toolbar position="static">
					<IconButton
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						aria-controls="simple-menu"
						aria-haspopup="true"
						onClick={menuClick}>
						<MenuIcon />
					</IconButton>
					<Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={menuClose(null)}>
						<MenuItem onClick={menuClose("github")}>
							<GitHub /> <span style={{ marginLeft: 10 }}>Github</span>
						</MenuItem>
						<MenuItem onClick={menuClose("sourceCode")}>
							<GitHub /> <span style={{ marginLeft: 10 }}>Source Code</span>
						</MenuItem>
						<MenuItem onClick={menuClose("mail")}>
							<EmailRounded /> <span style={{ marginLeft: 10 }}>Contact</span>
						</MenuItem>
					</Menu>
					<Typography variant="h6" className={classes.title}>
						?????????????????????
					</Typography>

					{login === true ? (
						<>
							<IconButton color="inherit" size="small" onClick={loginMenuClick}>
								{console.log("render login",userProfile)}
								<Avatar src={userProfile.imageUrl} />
							</IconButton>
							<Menu anchorEl={loginMenu} keepMounted open={Boolean(loginMenu)} onClose={menuClose("loginMenu")}>
								<MenuItem>
									<GoogleLogout
										icon={false}
										buttonText="Logout"
										clientId={googleLoginKey}
										onLogoutSuccess={responseGoogleLogout}
										onFailure={responseGoogleLogout}
									/>
								</MenuItem>
							</Menu>
						</>
					) : (
						<>
							<IconButton color="inherit" size="small" onClick={modalOpen}>
								<AccountCircleRounded />
								<span style={{ marginLeft: 5 }}>Login</span>
							</IconButton>
							<Modal className={classes.modal} open={handleModal} onClose={modalClose}>
								{modalBody}
							</Modal>
						</>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	menuButton: {
		marginRight: theme.spacing(2),
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	modalPaper: {
		display: "flex",
		justifyContent: "center",
		width: 300,
		backgroundColor: theme.palette.background.paper,
		border: "1px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	title: {
		flexGrow: 1,
	},
	appBar: {
		marginBottom: "40px",
	},
}));
