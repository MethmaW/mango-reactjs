import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
	root: {
		maxWidth: 345
	}
});

const Room = (props: any) => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography gutterBottom variant='h5' component='h2'>
					{props.data.propertyId.name}
				</Typography>
				<Typography gutterBottom variant='h5' component='h2'>
					{props.data.occupancy}
				</Typography>

				<Typography gutterBottom variant='h5' component='h2'>
					{' '}
					s ${props.data.rates[0].rate}
				</Typography>

				<Link to={{ pathname: `/reserve`, state: props.data }}>
					<button>Reserve</button>
				</Link>
			</CardContent>
		</Card>
	);
};

export default Room;
