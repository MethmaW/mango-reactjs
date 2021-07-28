import { makeStyles, Theme } from "@material-ui/core/styles";


export const useStyles = makeStyles((theme: Theme) => ({
	appBar: {
		color: theme.palette.primary.contrastText,

		position: "static",

		boxShadow: "none",
		borderBottom: "1px #ECECEC solid"
	},
	navIconHide: {
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	title: {
		flexGrow: 1,
	},
	themeChanger: {
		color: theme.palette.tertiary.main,
	},
}));
