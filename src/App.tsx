import React, { Suspense } from 'react';
import { Router } from 'react-router-dom';
import { Loader } from './components';
import { history } from './redux/configureStore';
import { Routes } from './router/index';
import './styles.css';

function App() {
	return (
		<React.Fragment>
			<Suspense fallback={<Loader />}>
				<Router history={history}>
					<div>
						<div>
							<Routes />
						</div>
					</div>
				</Router>
			</Suspense>
		</React.Fragment>
	);
}

export default App;
