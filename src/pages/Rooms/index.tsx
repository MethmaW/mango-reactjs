import React, { useEffect } from 'react';
import * as request from '../../utils/requests';
import { Room } from '../../components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';

const Rooms = () => {
	const checkin = useSelector((state: RootState) => state.dates.selectedStartDate);
	const checkout = useSelector((state: RootState) => state.dates.selectedEndDate);

	const getEData = async () => {
		await request.getRoomData(checkin, checkout).then((res) => console.log('home page room data', res.data));
	};

	if (checkin !== '') {
		getEData();
	}

	return (
		<div>
			<p>checkin {checkin} </p>
			<p> checkout {checkout} </p>
			<Room />
		</div>
	);
};

export default Rooms;
