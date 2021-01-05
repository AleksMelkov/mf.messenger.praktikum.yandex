import Page from "./Page.js";

type asPage<T> = new (isNew:boolean) => T;

export default class Route {
    protected _pathname:string;
    protected _pageClass:asPage<Page>;
    protected _page:Page|null;

    constructor(pathname:string, page:asPage<Page>) {
        this._pathname = pathname;
        this._pageClass = page;
        this._page = null;
    }

    navigate(pathname:string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._page) {
            this._page.removeElements();
        }
    }

    match(pathname:string) {
        return pathname === this._pathname;
    }

    render() {
        if (!this._page) {
            this._page = new this._pageClass(true);
        }
        this._page.getData().then((page:Page)=>{
            page.init();
        });
    }
}

