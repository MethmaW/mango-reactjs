import Signup from "../pages/SignUp";
import HomePage from "../pages/HomePage"
import Rooms from "../pages/Rooms"

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
	},
	{
		path: "/available-rooms",
		exact: true,
		name: "HomePage",
		component: Rooms,
	}
];

export default publicPaths;
