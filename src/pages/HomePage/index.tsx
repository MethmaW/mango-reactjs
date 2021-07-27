import * as React from "react";
import { useStyles } from "./styles";

const HomePage = () => {
	const classes = useStyles();

	return <div className={classes.root}>Home component</div>;
};

export default HomePage;
