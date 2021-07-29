import React from 'react';
import { useStyles } from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
	const checkin = useSelector((state: RootState) => state.dates.selectedStartDate);
	const history = useHistory();

	//TODO make the checkin date to today when user goes to home route

	const classes = useStyles();

	if (checkin !== '') {
		history.push('/available-rooms');
	}

	return <div className={classes.root}>welcome</div>;
};

export default HomePage;
