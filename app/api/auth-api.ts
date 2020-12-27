import { BaseAPI } from "./BaseAPI.js";

export class AuthSignup extends BaseAPI {
    create(...args:string[]) {
        const [ first_name, second_name, login, email, password, phone ] = args;
        return this.http.post('/signup',{
            headers:{
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                first_name:first_name,
                second_name:second_name,
                login:login,
                email:email,
                password:password,
                phone:phone,
            })
        });
    }
}

export class AuthSignin extends BaseAPI {
    create(...args:string[]) {
        const [ login, password ] = args;
        return this.http.post('/signin',{
            headers:{
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                login:login,
                password:password,
            })
        });
    }
}

export class AuthUserInfo extends BaseAPI {
    request() {
        return this.http.get('/user');
    }
}

export class AuthLogout extends BaseAPI {
    create() {
        return this.http.post('/logout');
    }
}