import { makeStyles, Theme } from "@material-ui/core/styles";


export const useStyles = makeStyles((theme: Theme) => ({
	appBar: {
		color: "#fff",
		borderBlockColor: "#fff",

		position: "static",

		boxShadow: "none",


	},
	title: {
		flexGrow: 1,
	},
	logo: {
		width: "150px",
	}
}));
