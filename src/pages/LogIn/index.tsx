import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as request from '../../utils/requests';
import * as AuthActions from '../../redux/actions/auth';
import { useActions } from '../../redux/actions';
import { useHistory } from "react-router-dom";

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
		Mango Holidays {new Date().getFullYear()}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', 
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

export default function SignIn() {
	const authActions = useActions(AuthActions);
	const history = useHistory();
	const classes = useStyles();

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const authUser: any = await request.authUser(email, password);

		if (authUser?.status === 200) {
			const userData = {
				userData: authUser.data,
				loggedIn: true
			}

			authActions.setAuth(userData);
			history.push("/");
		}
		
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Log in
				</Typography>
				<form className={classes.form} onSubmit={submitLogin}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
						autoFocus
						type='email'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
					/>
					<Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
						Log In
					</Button>
					<Grid container>
						<Grid item xs />
						<Grid item>
							<Link to='/signup'>
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}
