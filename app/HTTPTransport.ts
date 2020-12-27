import { queryString } from "./utils/queryString.js";

type Options = {
    headers?: Record<string,string>,
    method: METHODS;
    data?: any;
    timeout?: number,
    retries?: number,
}

enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export default class HTTPTransport {

    protected _baseUrl:string;

    constructor(url:string) {
        this._baseUrl = url;
    }

    public get = (url:string, options = {}) => {
        return this.request(this._baseUrl+url, {...options, method: METHODS.GET});
    }

    public post = (url:string, options = {}) => {
        return this.request(this._baseUrl+url, {...options, method: METHODS.POST});
    }

    public put = (url:string, options = {}) => {
        return this.request(this._baseUrl+url, {...options, method: METHODS.PUT});
    }

    public delete = (url:string, options = {}) => {
        return this.request(this._baseUrl+url, {...options, method: METHODS.DELETE});
    }

    public fetchWithRetry(url:string, options: Options) {
        const {retries=1} = options;

        function onError(err:Error) {
            const triesLeft = retries - 1;
            if (!triesLeft) {
                throw err;
            }
            return this.fetchWithRetry(url, {...options, retries: triesLeft});
        }
        return this.request(this._baseUrl+url,options).catch(onError);
    }

    protected request(url: string, options: Options , timeout = 5000): Promise<XMLHttpRequest> {
        const {headers, method, data} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            const isGet = method === METHODS.GET;

            xhr.open(method,
                isGet && !!data
                    ? `${url}${queryString(data)}`
                    : url,
                );

            if (headers) {
                Object.keys(headers).forEach(key => {
                    xhr.setRequestHeader(key, headers[key]);
                });
            }

            xhr.withCredentials = true;

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        })
    }
}