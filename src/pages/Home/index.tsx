import React, { useEffect } from 'react';
import { useStyles } from './styles';
import { useActions } from '../../redux/actions';
import * as DateActions from '../../redux/actions/dates';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
	const dateActions = useActions(DateActions);
	const checkin = useSelector((state: RootState) => state.dates.selectedStartDate);
	const checkout = useSelector((state: RootState) => state.dates.selectedEndDate);
	const history = useHistory();

	const userSelectedDates = {
		checkin: new Date().toString(),
		checkout: new Date().toString()
	};

	//TODO make the checkin date to today when user goes to home route

	const classes = useStyles();

	if (checkin !== '') {
		history.push('/available-rooms');
	}

	return <div className={classes.root}>welcome</div>;
};

export default HomePage;
