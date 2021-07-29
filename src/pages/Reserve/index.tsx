import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useHistory } from 'react-router-dom';
import * as request from '../../utils/requests';

const Reserve = () => {
	const { state } = useLocation();
	const checkin = useSelector((state: RootState) => state.dates.selectedStartDate);
	const checkout = useSelector((state: RootState) => state.dates.selectedEndDate);
	const isAuth = useSelector((state: RootState) => state.auth.loggedIn);
	const userData: any = useSelector((state: RootState) => state.auth.userData);
	const history = useHistory();

	const [ price, setPrice ] = useState<string>('');
	const [ parkingSpot, setParkingSpot ] = useState('');
	const [ plannedArrivalTime, setPlannedArrivalTime ] = useState('');
	const [ notes, setNotes ] = useState('');
	const [ paymentMethodId, setPaymentMethodId ] = useState('');
	const [ showBookingDetails, setShowBookingDetails ] = useState(false);
	const [ showPaymentOptions, setShowPaymentOptions ] = useState(false);
	const [ paymentMethods, setPaymentMethods ] = useState([]);

	const reserve = () => {
		if (!isAuth) {
			history.push('/signup');
		}

		if (isAuth) {
			if (price === '') {
				return alert('please select a price');
			}

			setShowBookingDetails(true);
		}
	};

	const goToPaymentOptions = async () => {
		if (parkingSpot === '') {
			return alert('please fill mandatory fields');
		}

		const paymentOptions: any = await request.getPaymentMethods();
		setPaymentMethods(paymentOptions.data.data);
		setShowPaymentOptions(true);
	};

	const completeBooking = async () => {
		if (paymentMethodId === '') {
			return alert('please select a payment method');
		}
		const bookingData = {
			userId: userData.data._id,
			roomId: state._id,
			price: parseInt(price),
			checkin: checkin,
			checkout: checkout,
			parkingSpot: parkingSpot === 'true',
			plannedArrivalTime: plannedArrivalTime,
			notes: notes,
			paymentMethodId: paymentMethodId
		};

		const createBooking: any = await request.createBooking(bookingData);

		if (createBooking) {
			alert('booking created successfully');
		}
	};

	return (
		<div>
			{state === undefined && <p>PLease select a date</p>}

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
						<RadioGroup
							aria-label='gender'
							name='gender1'
							value={price}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPrice(event.target.value)}
						>
							{state.rates.map((rate: any) => {
								return (
									<FormControlLabel
										key={rate.bookingType}
										value={rate.rate.toString()}
										control={<Radio />}
										label={`$${rate.rate} - ${rate.bookingType}`}
									/>
								);
							})}
						</RadioGroup>
					</FormControl>

					<br />
					<button onClick={reserve}>I'll reserve</button>
				</div>
			)}

			{showBookingDetails && (
				<div>
					<div>
						<p>Parking spot?</p>
						<RadioGroup
							aria-label='gender'
							name='gender1'
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setParkingSpot(e.target.value)}
						>
							<FormControlLabel value={'true'} control={<Radio />} label='yes' />
							<FormControlLabel value={'false'} control={<Radio />} label='no' />
						</RadioGroup>
					</div>

					<div>
						<p>Planned arrival time</p>
						<input
							type='time'
							value={plannedArrivalTime}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlannedArrivalTime(e.target.value)}
						/>
					</div>

					<div>
						<p>Any special notes?</p>
						<textarea value={notes} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)} />
					</div>

					<button onClick={goToPaymentOptions}>Next</button>
				</div>
			)}

			{showPaymentOptions && (
				<div>
					<p>Choose a payment method</p>
					<RadioGroup
						aria-label='gender'
						name='gender1'
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPaymentMethodId(event.target.value)}
					>
						{paymentMethods.map((method: any) => {
							return <FormControlLabel key={method._id} value={method._id} control={<Radio />} label={method.name} />;
						})}
					</RadioGroup>

					<button type='button' onClick={completeBooking}>
						Complete booking
					</button>
				</div>
			)}
		</div>
	);
};

export default Reserve;
