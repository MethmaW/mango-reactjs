import React, { Suspense } from "react";
import { Router } from "react-router-dom";
import { useStyles } from "./theme/App-styles";
import { Header, Loader } from "./components";
import { history } from "./redux/configureStore";
import { withTheme } from "./theme/withTheme";
import { Routes } from "./router/index";

function App() {
	const classes = useStyles();

	return (
		<Suspense fallback={<Loader />}>
			<Router history={history}>
				<div className={classes.root}>
					<div className={classes.appFrame}>
						<Header />
						<Routes />
					</div>
				</div>
			</Router>
		</Suspense>
	);
}

export default withTheme(App);
