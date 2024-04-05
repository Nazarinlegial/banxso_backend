import {IBaseCollection} from "./base.js";

export class UserCollection extends IBaseCollection {
    /**
    *
    * @type {
     *     userPrincipalName: string,
     *     id: string,
     *     displayName: string,
     *     surname?: string,
     *     givenName?: string,
     *     preferredLanguage: string,
     *     mail: string,
     *     mobilePhone?: string,
     *     jobTitle?: string,
     *     officeLocation: any,
     *     businessPhones: [],
     *     ageGroup?: string
     * }
    */
    profile
    role
    user_account_id
    ms_account

    constructor({
        role = undefined,
        profile = undefined,
        create_at = undefined,
        user_account_id = undefined,
        ms_account = undefined

                }) {
        super({create_at});
        this.profile = profile
        this.role = role
        this.user_account_id = user_account_id
        this.ms_account = ms_account
    }
}