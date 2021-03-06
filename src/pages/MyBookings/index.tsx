import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import * as request from '../../utils/requests';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useStyles } from './styles';
import { Button } from '@material-ui/core';

const HomePage = () => {
	const userData: any = useSelector((state: RootState) => state.auth.userData);
	const [ myBookings, setMyBookings ] = useState([]);
	const [ open, setOpen ] = useState(false);
	const [ fee, setFee ] = useState(0);
	const classes = useStyles();

	const getBookings = async () => {
		const myBookings: any = await request.getMyBookings(userData.data._id);
		setMyBookings(myBookings.data);
	};

	useEffect(() => {
		getBookings();
	}, []);

	const calculateCancellationFee = (bookedDate: any, price: any) => {
		const bookedCheckin = Date.parse(bookedDate) + 46800000;
		const currentTime = Date.parse(new Date().toString());
		const hoursLeft = Math.floor((bookedCheckin - currentTime) / 1000 / 60 / 60);

		if (hoursLeft > 24) {
			setFee(0);
		}
		if (hoursLeft <= 24 && hoursLeft >= 12) {
			setFee(price * 0.2);
		}
		if (hoursLeft < 12) {
			setFee(price);
		}
	};

	const handleClickOpen = (bookedDate: any, price: any) => {
		calculateCancellationFee(bookedDate, price);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const cancelBooking = async (id: string) => {
		const cancelBooking: any = await request.cancelBooking(id);
		setOpen(false);

		if (cancelBooking) {
			getBookings();
		}
	};

	const checkDate = () => {
		const date = new Date();
		return date;
	};

	return (
		<div>
			{myBookings.length !== 0 &&
				myBookings.map((booking: any) => {
					return (
						<div key={booking._id} className={classes.bookingCard}>
							<Dialog
								open={open}
								onClose={handleClose}
								aria-labelledby='alert-dialog-title'
								aria-describedby='alert-dialog-description'
							>
								<DialogTitle id='alert-dialog-title'>{'Are you sure you want to cancel the booking?'}</DialogTitle>
								<DialogContent>
									<DialogContentText id='alert-dialog-description'>Your cancellation fee will be: ${fee}</DialogContentText>
								</DialogContent>
								<DialogActions>
									<Button onClick={handleClose} color='primary'>
										Cancel
									</Button>
									<Button onClick={() => cancelBooking(booking._id)} color='primary' autoFocus>
										Confirm
									</Button>
								</DialogActions>
							</Dialog>

							<Card>
								<CardContent>
									<Typography gutterBottom variant='h5' component='h2'>
										{booking.roomId.propertyId.name} - {booking.roomId.occupancy}
									</Typography>
									<Typography gutterBottom variant='h5' component='h2'>
										checkin: {booking.checkin.slice(0, 10)}
									</Typography>
									<Typography gutterBottom variant='h5' component='h2'>
										checkout: {booking.checkout.slice(0, 10)}
									</Typography>

									<Typography gutterBottom variant='h5' component='h2'>
										Price: ${booking.price}
									</Typography>

									<Typography gutterBottom variant='h5' component='h2'>
										Payment method: {booking.paymentMethodId.name}
									</Typography>

									<Button
										onClick={() => handleClickOpen(booking.checkin, booking.price)}
										variant='contained'
										color='primary'
										className={classes.cancelBtn}
									>
										Cancel booking
									</Button>
								</CardContent>
							</Card>
						</div>
					);
				})}

			{myBookings.length === 0 && <p className={classes.cusText}>You have no bookings available</p>}
		</div>
	);
};

export default HomePage;
