import Router from "../Router.js";
import { ROUTE_LIST} from "./routeList.js";


import Auth from "../pages/Auth.js";
import Register from "../pages/Register.js";
import Chats from "../pages/Chats.js";
import Profile from "../pages/Profile.js";
import NotFound from "../pages/NotFound.js";
import ServerError from "../pages/ServerError.js";

const router = new Router();

router.use(ROUTE_LIST.AUTH,Auth)
    .use(ROUTE_LIST.REGISTER,Register)
    .use(ROUTE_LIST.CHATS,Chats)
    .use(ROUTE_LIST.PROFILE,Profile)
    .use(ROUTE_LIST.NOT_FOUND,NotFound)
    .use(ROUTE_LIST.SERVER_ERROR,ServerError)
    .start();
