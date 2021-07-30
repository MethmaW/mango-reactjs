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
	const [ open, setOpen ] = React.useState(false);
	const classes = useStyles();

	const getBookings = async () => {
		const myBookings: any = await request.getMyBookings(userData.data._id);
		setMyBookings(myBookings.data);
	};

	useEffect(() => {
		getBookings();
	});

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	//TODO user can book one room at a time

	const cancelBooking = async (id: string) => {
		const cancelBooking: any = await request.cancelBooking(id);
		setOpen(false);

		if (cancelBooking) {
			getBookings();
		}
	};

	return (
		<div>
			{myBookings.length !== 0 &&
				myBookings.map((booking: any) => {
					return (
						<div className={classes.bookingCard}>
							<Dialog
								open={open}
								onClose={handleClose}
								aria-labelledby='alert-dialog-title'
								aria-describedby='alert-dialog-description'
							>
								<DialogTitle id='alert-dialog-title'>{'Are you sure you want to cancel the booking?'}</DialogTitle>
								<DialogContent>
									<DialogContentText id='alert-dialog-description'>Your cancellation fee will be: ${0}</DialogContentText>
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

									<Button onClick={handleClickOpen} variant='contained' color='primary' className={classes.cancelBtn}>
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
