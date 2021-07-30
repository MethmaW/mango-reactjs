import { makeStyles, Theme } from "@material-ui/core/styles";


export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		maxWidth: 800,
		marginLeft: "auto",
		marginRight: "auto",
		marginTop: "2%",
		boxShadow: "none",
		border: "1px solid #C6C6C6"
	},
	customRow: {
		display: "flex",
		justifyContent: "space-between"
	},
	customBtn: {
		backgroundColor: "transparent",
		border: "1px solid #630059",
		borderRadius: "3px",
		fontSize: "0.9rem",
		padding: "5px",
		'&:hover': {
			background: "#630059",
			color: "#fff"
		},
	},
	secRow: {
		marginTop: "80%"
	},
	noreserve: {
		color: "red"
	}

}));