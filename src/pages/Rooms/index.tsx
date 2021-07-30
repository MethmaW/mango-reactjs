import React, { useState, useEffect } from 'react';
import { Room } from '../../components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import * as request from '../../utils/requests';

const Rooms = () => {
	const checkin = useSelector((state: RootState) => state.dates.selectedStartDate);
	const checkout = useSelector((state: RootState) => state.dates.selectedEndDate);
	const rooms = useSelector((state: RootState) => state.rooms.data);

	const userData: any = useSelector((state: RootState) => state.auth.userData);

	const [ showReserveBtn, setShowReserveBtn ] = useState(false);

	const checkUserHasBookings = async () => {
		const myBookings: any = await request.getMyBookings(userData.data._id);

		console.log('myBookingsmyBookings', myBookings);

		if (myBookings.data?.length > 0) {
			setShowReserveBtn(false);
		}

		if (myBookings.data?.length === 0) {
			setShowReserveBtn(true);
		}
	};

	useEffect(() => {
		checkUserHasBookings();
	});

	return (
		<div>
			{checkin === '' && <p>Please select a checkin date</p>}

			{!showReserveBtn && <p style={{ textAlign: 'center' }}>You can only have 1 reservation at a time!</p>}

			{checkin !== '' &&
				rooms.map((room: any) => {
					return <Room key={room._id} data={room} showReserveBtn={showReserveBtn} />;
				})}
		</div>
	);
};

export default Rooms;
