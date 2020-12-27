import Route from "./Route.js";
import Page from "./Page.js";

type asPage<T> = new () => T;

export default class Router {

    protected routes:Route[];
    protected history:History;
    protected _currentRoute:Route|null;

    static __instance:Router;

    constructor(isNew:boolean=false) {
        if (Router.__instance&&!isNew) {
            return Router.__instance;
        }
        this.history = window.history
        this.routes = [];
        this._currentRoute = null;

        if (!isNew) {
            Router.__instance = this;
        }
    }

    use(pathname:string, page:asPage<Page>) {
        const route = new Route(pathname, page);
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = (event:PopStateEvent) => {
            const target = event.target;
            if (target) {
                this._onRoute((target as Window).location.pathname);
            }
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname:string) {
        const route = this.getRoute(pathname);

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        if (route) {
            this._currentRoute = route;
            route.render();
        }
    }

    go(pathname:string) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getCurrentRoute() {
        return this._currentRoute;
    }

    getRoute(pathname:string) {
        return this.routes.find(route => route.match(pathname));
    }

    getRoutes() {
        return this.routes;
    }
}