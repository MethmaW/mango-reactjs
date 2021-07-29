import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import * as request from '../../utils/requests';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
	const history = useHistory();
	const userData: any = useSelector((state: RootState) => state.auth.userData);
	const [ myBookings, setMyBookings ] = useState([]);
	const [ open, setOpen ] = React.useState(false);

	const getBookings = async () => {
		const myBookings: any = await request.getMyBookings(userData.data._id);
		setMyBookings(myBookings.data);
	};

	useEffect(() => {
		getBookings();
	}, []);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	//user can book one room at a time

	const cancelBooking = async (id: string) => {
		const cancelBooking: any = await request.cancelBooking(id);
		setOpen(false);

		getBookings();
	};

	return (
		<div>
			{myBookings.length !== 0 &&
				myBookings.map((booking: any) => {
					return (
						<div>
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
										checkin: {booking.checkin.slice(0, 10)} checkout: {booking.checkout.slice(0, 10)}
									</Typography>

									<Typography gutterBottom variant='h5' component='h2'>
										${booking.price}
									</Typography>

									<Typography gutterBottom variant='h5' component='h2'>
										Payment method: {booking.paymentMethodId.name}
									</Typography>

									<button onClick={handleClickOpen}>Cancel booking</button>
								</CardContent>
							</Card>
						</div>
					);
				})}

			{myBookings.length == 0 && <p>You have no bookings available</p>}
		</div>
	);
};

export default HomePage;
