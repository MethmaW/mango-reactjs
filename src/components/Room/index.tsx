import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { useStyles } from './styles';

const Room = (props: any) => {
	const classes = useStyles();

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

						{props.showReserveBtn && (
							<Link to={{ pathname: `/reserve`, state: props.data }}>
								<button className={classes.customBtn}>Reserve</button>
							</Link>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default Room;
