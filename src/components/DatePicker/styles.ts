import { makeStyles, Theme } from "@material-ui/core/styles";


export const useStyles = makeStyles((theme: Theme) => ({
	dateSpan: {
		border: "1px solid #630059",
		padding: "10px",
		borderRadius: "5px"
	},
	dateRangeDiv: {
		textAlign: "center",
		marginBottom: "6%"
	}
}));