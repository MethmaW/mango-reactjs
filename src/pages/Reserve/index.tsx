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
import { useStyles } from './styles';
import { Button } from '@material-ui/core';
import { Divider } from '@material-ui/core';

const Reserve = () => {
	const { state } = useLocation();
	const checkin = useSelector((state: RootState) => state.dates.selectedStartDate);
	const checkout = useSelector((state: RootState) => state.dates.selectedEndDate);
	const isAuth = useSelector((state: RootState) => state.auth.loggedIn);
	const userData: any = useSelector((state: RootState) => state.auth.userData);
	const history = useHistory();
	const classes = useStyles();

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

		history.push('/my-bookings');
	};

	return (
		<div>
			{state === undefined && <p>PLease select a date</p>}

			{state !== undefined && (
				<div className={classes.customRow}>
					<div className={classes.details}>
						<h1>
							{state.propertyId.name} - {state.occupancy}
						</h1>
						<Divider />
						<div>
							<h3>What this place offers</h3>
							{state.amenities.map((amenty: string) => {
								return <li key={amenty}>{amenty}</li>;
							})}
						</div>
						<Divider className={classes.mTop} />
						<div>
							<h3>Your stay</h3>
							<span>
								Checkin: {checkin.slice(0, 15)} at {state.defaultCheckin}:00
							</span>
							<br />
							<span>
								Checkout: {checkout.slice(0, 15)} at {state.defaultCheckout}:00
							</span>
						</div>
					</div>

					<div className={classes.prices}>
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
						<Button onClick={reserve} variant='contained' color='primary' className={classes.reserveBtn}>
							1 - SELECT PRICE
						</Button>
					</div>
				</div>
			)}

			{showBookingDetails && (
				<div className={classes.additionalDetails}>
					<div>
						<div>
							<h2>Almost there!</h2>
							<Divider />
							<h3>Need a parking spot? *</h3>
							<RadioGroup
								aria-label='gender'
								name='gender1'
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => setParkingSpot(e.target.value)}
							>
								<FormControlLabel value={'true'} control={<Radio />} label='yes' />
								<FormControlLabel value={'false'} control={<Radio />} label='no' />
							</RadioGroup>
						</div>

						<Divider className={classes.mTop} />
						<div>
							<h3>Your planned arrival time</h3>
							<input
								type='time'
								value={plannedArrivalTime}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlannedArrivalTime(e.target.value)}
								className={classes.timeInput}
							/>
						</div>

						<Divider className={classes.mTop} />
						<div>
							<h3>Any special notes?</h3>
							<textarea
								rows={5}
								cols={50}
								value={notes}
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
							/>
						</div>

						<Button onClick={goToPaymentOptions} variant='contained' color='primary' className={classes.reserveBtn}>
							2 - Choose a payment method
						</Button>
					</div>

					<div className={showPaymentOptions ? classes.prices : classes.hidePrices}>
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

								<Button
									className={classes.reserveBtn}
									type='button'
									onClick={completeBooking}
									variant='contained'
									color='primary'
								>
									3 - Complete booking
								</Button>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Reserve;
