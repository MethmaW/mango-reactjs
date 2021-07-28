import React, { Suspense } from 'react';
import { Router } from 'react-router-dom';
import { useStyles } from './theme/App-styles';
import { Loader } from './components';
import { history } from './redux/configureStore';
import { withTheme } from './theme/withTheme';
import { Routes } from './router/index';
import './styles.css';

function App() {
	const classes = useStyles();

	return (
		<React.Fragment>
			<Suspense fallback={<Loader />}>
				<Router history={history}>
					<div className={classes.root}>
						<div className={classes.appFrame}>
							<Routes />
						</div>
					</div>
				</Router>
			</Suspense>
		</React.Fragment>
	);
}

export default withTheme(App);
