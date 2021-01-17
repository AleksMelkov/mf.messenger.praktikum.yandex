import { BaseAPI } from "./BaseAPI";

export class SaveUserProfileApi extends BaseAPI {
    update<T>(args:T) {
        return this.http.put('/profile',{
            data: JSON.stringify(args)
        },true);
    }
}

export class SaveUserAvatarApi extends BaseAPI {
    update<T>(args: T) {
        return this.http.put('/avatar',{
            data: args
        })
    }
}

export class SaveUserPassApi extends BaseAPI {
    update<T>(args: T) {
        return this.http.put('/password',{
            data:JSON.stringify(args)
        },true);
    }
}