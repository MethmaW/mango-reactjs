import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { useStyles } from './styles';
import Grid from '@material-ui/core/Grid';
import * as request from '../../utils/requests';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';

const Room = (props: any) => {
	const userData: any = useSelector((state: RootState) => state.auth.userData);
	const classes = useStyles();

	const [ showReserveBtn, setShowReserveBtn ] = useState(false);

	const checkUserHasBookings = async () => {
		const myBookings: any = await request.getMyBookings(userData.data._id);

		if (myBookings.data) {
			setShowReserveBtn(false);
		}
	};

	return (
		<Card className={classes.root}>
			<CardContent>
				<div className={classes.customRow}>
					<div>
						<Typography gutterBottom variant='h5' component='h2'>
							{props.data.propertyId.name}
						</Typography>
						<Typography gutterBottom variant='h6' component='h2'>
							{props.data.occupancy}
						</Typography>
					</div>

					<div>
						<Typography gutterBottom variant='h5' component='h2' align='right'>
							{' '}
							${props.data.rates[0].rate}
						</Typography>

						{showReserveBtn && (
							<Link to={{ pathname: `/reserve`, state: props.data }}>
								<button className={classes.customBtn} onClick={checkUserHasBookings}>
									Reserve
								</button>
							</Link>
						)}

						{!showReserveBtn && <p className={classes.noreserve}>You can only have 1 reservation at a time</p>}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default Room;
