import Router from '../Router';
import { ROUTE_LIST } from './routeList';

import Auth from '../pages/Auth';
import Register from '../pages/Register';
import Chats from '../pages/Chats';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import ServerError from '../pages/ServerError';

const router = new Router();

router.use(ROUTE_LIST.AUTH, Auth)
  .use(ROUTE_LIST.REGISTER, Register)
  .use(ROUTE_LIST.CHATS, Chats)
  .use(ROUTE_LIST.PROFILE, Profile)
  .use(ROUTE_LIST.NOT_FOUND, NotFound)
  .use(ROUTE_LIST.SERVER_ERROR, ServerError)
  .start();
