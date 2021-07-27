import Signup from "../pages/SignUp";
import HomePage from "../pages/HomePage"

const publicPaths = [
	{
		path: "/signup",
		exact: true,
		name: "Signup",
		component: Signup,
	},
	{
		path: "/",
		exact: true,
		name: "HomePage",
		component: HomePage,
	}
];

export default publicPaths;
