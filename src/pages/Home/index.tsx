import React, { useEffect } from 'react';
import { useStyles } from './styles';
import { useActions } from '../../redux/actions';
import * as DateActions from '../../redux/actions/dates';

const HomePage = () => {
	const dateActions = useActions(DateActions);

	const userSelectedDates = {
		checkin: new Date().toString(),
		checkout: new Date().toString()
	};

	//TODO make the checkin date to today when user goes to home route

	const classes = useStyles();

	return <div className={classes.root}>welcome</div>;
};

export default HomePage;
