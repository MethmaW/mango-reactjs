import React, { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import { useActions } from '../../redux/actions';
import * as DateActions from '../../redux/actions/dates';
import { Link } from 'react-router-dom';

const DatePicker = () => {
	const dateActions = useActions(DateActions);

	const [ selectedDates, setSelectedDates ] = useState([
		{
			startDate: new Date(),
			endDate: addDays(new Date(), 1),
			key: 'selection'
		}
	]);

	const userSelectedDates = {
		checkin: selectedDates[0].startDate.toString(),
		checkout: selectedDates[0].endDate.toString()
	};

	const handleSelect = (ranges: any) => {
		console.log('ranges', ranges);
		setSelectedDates([ ranges.selection ]);
	};

	const searchRoomAvailability = () => {
		dateActions.setCheckinDate(userSelectedDates);
	};

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
