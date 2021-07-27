import React, { FC } from "react";
import { Route, Redirect } from "react-router-dom";

interface Props {
	isAuth: boolean;
	component: any;
	path: any;
	exact: any;
}

const ProtectedRoute: FC<Props> = ({
	isAuth,
	component: Component,
	path,
	exact,
}) => {
	return (
		<Route
			path={path}
			exact={exact}
			render={(props) => {
				if (isAuth) {
					return <Component />;
				} else {
					return (
						<Redirect
							to={{
								pathname: "/signup",
								state: { from: props.location },
							}}
						/>
					);
				}
			}}
		/>
	);
};

export default ProtectedRoute;
