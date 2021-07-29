import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import publicPaths from './publicPaths';
import privatePaths from './privatePaths';
import ProtectedRoute from './ProtectedRoute';
import NotFound from '../pages/NotFound';
import { Header, Loader, DatePicker } from '../components';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import Signup from '../pages/SignUp';
import Login from '../pages/LogIn';

export function Routes() {
	const location: any | string = useLocation();
	console.log('fuj', location.pathname);

	const isAuth = useSelector((state: RootState) => state.auth.loggedIn);

	const [ authCookie, setAuthCookie ] = useState<string | undefined>('');

	return (
		<div className='appRouter'>
			<Header />
			<DatePicker />

			<Switch>
				{publicPaths.map((route, i) => {
					return (
						route.component && (
							<Route key={i} path={route.path} exact={route.exact} name={route.name} component={route.component} />
						)
					);
				})}

				{privatePaths.map((route, i) => {
					return (
						<ProtectedRoute key={i} path={route.path} exact={route.exact} component={route.component} isAuth={isAuth} />
					);
				})}

				<Route
					path='/signup'
					exact={true}
					render={(props) => {
						if (!isAuth) {
							return <Signup />;
						} else {
							return <Redirect to='/' />;
						}
					}}
				/>

				<Route
					path='/login'
					exact={true}
					render={(props) => {
						if (!isAuth) {
							return <Login />;
						} else {
							return <Redirect to='/' />;
						}
					}}
				/>

				<Route path='*' exact={true} component={NotFound} />
			</Switch>
		</div>
	);
}
