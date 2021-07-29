import React, { useState } from 'react';
import { DatePicker } from '..';
import * as request from '../../utils/requests';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { Link } from 'react-router-dom';
import { useActions } from '../../redux/actions';
import * as DatesActions from '../../redux/actions/dates';

const Search = (props: any) => {
	const checkin = useSelector((state: RootState) => state.dates.selectedStartDate);
	const checkout = useSelector((state: RootState) => state.dates.selectedEndDate);
	const dateActions = useActions(DatesActions);
	const [ availableRooms, setAvailableRooms ] = useState([]);

	const getAvailableRooms = async () => {
		const roomData = await request.getRoomData(props.checkin, props.checkout);
		setAvailableRooms(roomData);
	};

	return <div>savage look</div>;
};

export default Search;
