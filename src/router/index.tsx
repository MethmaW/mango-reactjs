import React from "react";
import { Route, Switch } from "react-router-dom";
import publicPaths from "./publicPaths";
import privatePaths from "./privatePaths";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/NotFound";

export function Routes() {
	return (
		<div>
			<Switch>
				{publicPaths.map((route, i) => {
					return (
						route.component && (
							<Route
								key={i}
								path={route.path}
								exact={route.exact}
								name={route.name}
								component={route.component}
							/>
						)
					);
				})}

				{privatePaths.map((route, i) => {
					return (
						<ProtectedRoute
							key={i}
							path={route.path}
							exact={route.exact}
							component={route.component}
							isAuth={false}
						/>
					);
				})}

				<Route path="*" exact={true} component={NotFound} />
			</Switch>
		</div>
	);
}
