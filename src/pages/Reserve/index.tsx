import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Link } from 'react-router-dom';

const Reserve = () => {
	const { state } = useLocation();
	const checkin = useSelector((state: RootState) => state.dates.selectedStartDate);
	const checkout = useSelector((state: RootState) => state.dates.selectedEndDate);

	console.log('statestate', state);

	const [ value, setValue ] = React.useState('female');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};

	console.log('valuevalue', value);

	return (
		<div>
			{state == undefined && <p>PLease select a date</p>}

			{state !== undefined && (
				<div>
					<h1>
						{state.propertyId.name} - {state.occupancy}
					</h1>

					{state.amenities.map((amenty: string) => {
						return <p key={amenty}>{amenty}</p>;
					})}

					<p>checkin date{checkin} </p>
					<p>Checkin time {state.defaultCheckin}</p>

					<p> checkout {checkout} </p>
					<p>Checkin time {state.defaultCheckout}</p>

					<FormControl component='fieldset'>
						<RadioGroup aria-label='gender' name='gender1' value={value} onChange={handleChange}>
							{state.rates.map((rate: any) => {
								return (
									<FormControlLabel
										key={rate.bookingType}
										value={rate.bookingType}
										control={<Radio />}
										label={`$${rate.rate} - ${rate.bookingType}`}
									/>
								);
							})}
						</RadioGroup>
					</FormControl>

					<Link to='/available-rooms'>
						<button>Search</button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default Reserve;
