import { AppBar, Typography, Toolbar } from '@material-ui/core';
import React from 'react';
import { useStyles } from './styles';
import logo from '../../assets/logo.png';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {
	const location = useLocation();
	const classes = useStyles();

	if (location.pathname.match(/signup/) || location.pathname.match(/login/)) {
		return null;
	}

	return (
		<AppBar className={classes.appBar}>
			<Toolbar>
				<Typography variant='h6' color='inherit' className={classes.title}>
					<img src={logo} alt='logo' className={classes.logo} />
				</Typography>
				<Link to='/my-bookings'>My Bookings</Link>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
