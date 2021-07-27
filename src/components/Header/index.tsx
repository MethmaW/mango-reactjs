import { AppBar, IconButton, Toolbar, Typography, useMediaQuery } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import Brightness7 from '@material-ui/icons/Brightness7';
import NightsStay from '@material-ui/icons/NightsStay';
import React from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../redux/actions';
import * as ThemeActions from '../../redux/actions/theme';
import { RootState } from '../../redux/reducers';
import { useStyles } from './styles';
import logo from '../../assets/logo.png';

const Header = () => {
	const classes = useStyles();
	const isDarkTheme = useSelector((state: RootState) => state.theme.isDarkTheme);
	const themeActions = useActions(ThemeActions);

	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

	return (
		<AppBar className={classes.appBar}>
			<Toolbar>
				<Typography variant='h6' color='inherit' noWrap={isMobile} className={classes.title}>
					<img src={logo} />
				</Typography>
				<IconButton
					color='inherit'
					aria-label='theme changer'
					className={classes.themeChanger}
					onClick={() => themeActions.toggleTheme()}
				>
					{!isDarkTheme ? <Brightness7 /> : <NightsStay />}
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
