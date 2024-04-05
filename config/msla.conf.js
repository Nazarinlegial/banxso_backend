import {loadEnv} from '../helper/utils/env.js'
import {msalCachePlugin} from "../helper/plugin/msal.js";
loadEnv()

export const msalConfig = {
    auth: {
        clientId: process.env.MS_CLIENT_ID, // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
        authority: process.env.MS_AUTHORITY_URI, // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
        clientSecret: process.env.MS_CLIENT_SECRET // Client secret generated from the app registration in Azure portal
    },
    cache: {
        cachePlugin: msalCachePlugin
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: 3,
        }
    }
}


export const MS_REDIRECT_PATH = process.env.MS_REDIRECT_PATH;

export const MS_REDIRECT_SUCCESS_URI = process.env.MS_REDIRECT_SUCCESS_URI

export const MS_POST_LOGOUT_REDIRECT_URI = process.env.MS_POST_LOGOUT_REDIRECT_URI;

export const MS_CLIENT_URI = process.env.MS_CLIENT_REDIRECT_HOST

export const MS_SERVER_URI = process.env.MS_SERVER_REDIRECT_HOST
export const MS_SCOPES = ['User.read','Mail.read','Mail.send']

export const BASE_ROLE = 'user'

export const ROLES = {
    admin: 'admin',
    user: 'user'
}

const LOGOUT_REDIRECT_URI = new URL(process.env.MS_POST_LOGOUT_REDIRECT_URI, process.env.MS_CLIENT_REDIRECT_HOST).toString()

export const MS_LOGOUT_URI = `${process.env.MS_AUTHORITY_URI}/oauth2/v2.0/logout?post_logout_redirect_uri=${LOGOUT_REDIRECT_URI}`

export const MS_REDIRECT_URI = new URL(MS_REDIRECT_PATH, MS_SERVER_URI).toString()