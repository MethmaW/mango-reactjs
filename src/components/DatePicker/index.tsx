import React, { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { useActions } from '../../redux/actions';
import * as DateActions from '../../redux/actions/dates';
import * as RoomActions from '../../redux/actions/rooms';
import { Link } from 'react-router-dom';
import * as request from '../../utils/requests';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { useLocation } from 'react-router-dom';
import addDays from 'date-fns/addDays';

const DatePicker = () => {
	const location = useLocation();

	const checkin = useSelector((state: RootState) => state.dates.selectedStartDate);
	const checkout = useSelector((state: RootState) => state.dates.selectedEndDate);
	const dateActions = useActions(DateActions);
	const roomActions = useActions(RoomActions);

	const startDate = checkin === '' ? new Date() : new Date(checkin);
	const endDate = checkout === '' ? new Date() : new Date(checkout);

	const [ availableRooms, setAvailableRooms ] = useState([]);
	const [ selectedDates, setSelectedDates ] = useState([
		{
			startDate: startDate,
			endDate: endDate,
			key: 'selection'
		}
	]);

	if (location.pathname.match(/signup/) || location.pathname.match(/login/)) {
		return null;
	}

	const userSelectedDates = {
		checkin: selectedDates[0].startDate.toString(),
		checkout:
			selectedDates[0].startDate === selectedDates[0].endDate
				? addDays(selectedDates[0].endDate, 1).toString()
				: selectedDates[0].endDate.toString()
	};

	const getAvailableRooms = async () => {
		const roomData: any = await request.getRoomData(userSelectedDates.checkin, userSelectedDates.checkout);
		setAvailableRooms(roomData.data);
	};

	const handleSelect = (ranges: any) => {
		setSelectedDates([ ranges.selection ]);
	};

	const searchRoomAvailability = () => {
		dateActions.setCheckinDate(userSelectedDates);
		getAvailableRooms();
	};

	if (availableRooms.length !== 0) {
		roomActions.setRooms(availableRooms);
	}

	return (
		<React.Fragment>
			{' '}
			<DateRangePicker
				onChange={handleSelect}
				moveRangeOnFirstSelection={false}
				months={2}
				ranges={selectedDates}
				direction='horizontal'
				rangeColors={[ '#641455' ]}
				minDate={new Date()}
			/>{' '}
			<Link to='/available-rooms'>
				<button onClick={() => searchRoomAvailability()}>Search</button>
			</Link>
		</React.Fragment>
	);
};

export default DatePicker;
