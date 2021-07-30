import { makeStyles, Theme } from "@material-ui/core/styles";


export const useStyles = makeStyles((theme: Theme) => ({
	customRow: {
		display: "flex",
		justifyContent: "space-between",
		marginLeft: "25%",
		marginRight: "25%",
	},
	details: {

	},
	prices: {
		alignSelf: "center",
		padding: "5%",
		border: "1px solid #DDDDDD",
		boxShadow: "4px 4px 4px #DDDDDD",
		borderRadius: "5px"
	},
	reserveBtn: {
		marginTop: "5%",
		width: "100%"
	},
	additionalDetails: {
		display: "flex",
		justifyContent: "space-between",
		marginLeft: "25%",
		marginRight: "25%",
		marginTop: "5%",
		marginBottom: "5%"
	},
	timeInput: {
		padding: "2%"
	},
	hidePrices: {
		display: "none"
	},
	mTop: {
		marginTop: "5%"
	}
}));