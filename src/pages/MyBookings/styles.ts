import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
	root: {

	},
	bookingCard: {
		maxWidth: 800,
		marginLeft: "auto",
		marginRight: "auto",
		marginTop: "2%",
		boxShadow: "none",
		border: "1px solid #C6C6C6",
		borderRadius: "5px"
	},
	cancelBtn: {
		marginTop: "2%",
	},
	cusText: {
		textAlign: "center"
	}
}));
