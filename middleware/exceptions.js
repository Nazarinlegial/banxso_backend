import {ApiError} from '../service/exceptions.js'
import {ERROR_TYPES} from "../helper/constants/error.js";
import {authService} from "../service/auth.service.js";
import {tokenService} from "../service/token.service.js";
import {MS_CLIENT_URI, MS_POST_LOGOUT_REDIRECT_URI} from "../config/msla.conf.js";
import {GraphError} from "@microsoft/microsoft-graph-client";
import {AuthError} from "@azure/msal-common";

export default async function (err, req, res, next) {

    if (err instanceof ApiError) {
        if (err.errors.error && err.errors.error === ERROR_TYPES.MS_AUTH_ERROR) {

        }
        return res.status(err.status).json({message: err.message, errors: err.errors});
    }

    if (err instanceof GraphError || err instanceof AuthError) {
        const {refreshToken} = req.cookies;

        if (refreshToken) {
            await authService.logout(refreshToken)
            await tokenService.removeRefreshToken(refreshToken)
            res.clearCookie('refreshToken')
        }

        const logout = new URL(MS_POST_LOGOUT_REDIRECT_URI, MS_CLIENT_URI)
        logout.searchParams.set("type", ERROR_TYPES.MS_AUTH_ERROR.toLowerCase())
        return res.redirect(logout.toString())
    }

    return res.status(500).json({message: 'Технічні проблеми!'})
};
