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
import { useLocation, useHistory } from 'react-router-dom';
import addDays from 'date-fns/addDays';
import { Button } from '@material-ui/core';
import { useStyles } from './styles';

const DatePicker = () => {
	const location = useLocation();
	const history = useHistory();
		const classes = useStyles();

	const checkin = useSelector((state: RootState) => state.dates.selectedStartDate);
	const checkout = useSelector((state: RootState) => state.dates.selectedEndDate);
	const dateActions = useActions(DateActions);
	const roomActions = useActions(RoomActions);

	const startDate = checkin === '' ? new Date() : new Date(checkin);
	const endDate = checkout === '' ? new Date() : new Date(checkout);

	const [ showDatePicker, setShowDatePicker ] = useState(false);
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
		setShowDatePicker(false);
		dateActions.setCheckinDate(userSelectedDates);
		getAvailableRooms();

		history.push("/available-rooms")
	};

	if (availableRooms.length !== 0) {
		roomActions.setRooms(availableRooms);
	}

	return (
		<div className={classes.dateRangeDiv}>
			{' '}
			{showDatePicker ? (
				<DateRangePicker
					onChange={handleSelect}
					moveRangeOnFirstSelection={false}
					months={2}
					ranges={selectedDates}
					direction='horizontal'
					rangeColors={[ '#641455' ]}
					minDate={new Date()}
				/>
			) : (
				<span onClick={() => setShowDatePicker(true)} className={classes.dateSpan}>
					<span>Checkin {checkin?.slice(0, 15)}</span> - <span>Checkout {checkout?.slice(0, 15)}</span>
				</span>
			)}{' '}
			&nbsp; &nbsp; &nbsp;
				<Button onClick={() => searchRoomAvailability()} variant="contained" color="primary">Search</Button>
	
		</div>
	);
};

export default DatePicker;
