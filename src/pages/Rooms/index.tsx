import React from 'react';
import { Room } from '../../components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';

const Rooms = () => {
	const checkin = useSelector((state: RootState) => state.dates.selectedStartDate);
	const checkout = useSelector((state: RootState) => state.dates.selectedEndDate);
	const rooms = useSelector((state: RootState) => state.rooms.data);

	return (
		<div>
			{checkin === '' && <p>Please select a checkin date</p>}

			{checkin !== '' &&
				rooms.map((room: any) => {
					return <Room key={room._id} data={room} />;
				})}
		</div>
	);
};

export default Rooms;
