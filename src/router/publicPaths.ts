import Home from "../pages/Home"
import Rooms from "../pages/Rooms"
import Reserve from "../pages/Reserve";

const publicPaths = [
	{
		path: "/",
		exact: true,
		name: "Home",
		component: Home,
	},
	{
		path: "/available-rooms",
		exact: true,
		name: "Rooms",
		component: Rooms,
	},
	{
		path: "/reserve",
		exact: true,
		name: "Reserve",
		component: Reserve,
	}
];

export default publicPaths;
