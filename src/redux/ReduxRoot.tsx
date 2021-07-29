import * as React from 'react';
import { Provider } from 'react-redux';
import App from '../App';
import configureStore from './configureStore';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = configureStore();

export function ReduxRoot() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	);
}
