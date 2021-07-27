import React, { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';

const DatePicker = () => {
	const [ state, setState ] = useState([
		{
			startDate: new Date(),
			endDate: addDays(new Date(), 1),
			key: 'selection'
		}
	]);

	const handleSelect = (ranges: any) => {
		console.log('ranges', ranges);
		setState([ ranges.selection ]);
	};

	return (
		<div>
			{' '}
			<DateRangePicker
				onChange={handleSelect}
				moveRangeOnFirstSelection={false}
				months={2}
				ranges={state}
				direction='horizontal'
				rangeColors={[ '#641455' ]}
				minDate={new Date()}
			/>{' '}
		</div>
	);
};

export default DatePicker;
