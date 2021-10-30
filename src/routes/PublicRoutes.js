import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
	Login,
	Register,
	ForgotPassword,
	ResetPassword,
	LandingPage,
	ConnectionError
} from 'components';

function PublicRoutes() {
	return (
		<Fragment>
			<Switch>
				<Route path="/forgot-password">
					<ForgotPassword />
				</Route>
				<Route path="/reset-password">
					<ResetPassword />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/connection-error">
					<ConnectionError />
				</Route>
				<Route path="">
					<LandingPage />
				</Route>
			</Switch>
		</Fragment>
	);
}

export default PublicRoutes;
