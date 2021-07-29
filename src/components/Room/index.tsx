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

	const newTo = {
		pathname: '/category/595212758daa6810cbba4104',
		param1: 'Par1'
	};
	const backUrl = '/some/other/value';
	return (
		<Card className={classes.root}>
			{/* <CardMedia
					component='img'
					alt='Contemplative Reptile'
					height='140'
					image='/static/images/cards/contemplative-reptile.jpg'
					title='Contemplative Reptile'
				/> */}
			<CardContent>
				<Typography gutterBottom variant='h5' component='h2'>
					{props.data.propertyId.name}
				</Typography>
				<Typography gutterBottom variant='h5' component='h2'>
					{props.data.occupancy}
				</Typography>
				{/* <Typography variant='body2' color='textSecondary' component='p'>
						Lizards are a widespread group of squamate reptiles, with over 6, 000 species, ranging across all continents
						except Antarctica
					</Typography> */}

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
