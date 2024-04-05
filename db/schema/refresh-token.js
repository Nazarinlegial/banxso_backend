import {IBaseCollection} from "./base.js";

export class RefreshTokenCollection extends IBaseCollection {
    token
    user_id

    constructor({
                    token, user_id, create_at, update_at
                }) {
        super({create_at});
        this.token = token
        this.user_id = user_id
    }



}

