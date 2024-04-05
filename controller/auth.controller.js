import {
    MS_SCOPES, MS_REDIRECT_SUCCESS_URI, MS_CLIENT_URI, MS_REDIRECT_URI,
} from "../config/msla.conf.js";
import {msalClient} from '../service/msla.service.js'
import {graphService} from "../service/graph.service.js";
import {tokenService} from "../service/token.service.js";
import {authService} from "../service/auth.service.js";

class AuthController {



    async signup(req, res, next) {
        try {
            const urlParams = {
                scopes: MS_SCOPES,
                redirectUri: MS_REDIRECT_URI
            }

            try {
                const authUrl = await msalClient.getAuthCodeUrl(urlParams)
                return res.redirect(authUrl)
            } catch (error) {
                console.error("Error login api: ", error)
            }

        } catch (e) {
            next(e)
        }
    }

    async redirect(req, res, next) {
        try {
            const code = req.query["code"]
            const tokens = await graphService.redirect(code)
            authService.createCookieRefreshToken({
                res,
                token: tokens.refreshToken
            })

            const url = new URL(MS_REDIRECT_SUCCESS_URI, MS_CLIENT_URI)
            url.searchParams.set("accessToken", tokens.accessToken)

            return res.status(301).redirect(url.toString())
        } catch (e) {
            next(e)
        }
    }


    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            await authService.logout(refreshToken)
            await tokenService.removeRefreshToken(refreshToken)
            res.clearCookie('refreshToken')

            return res.json({logout: 'ok'})
        } catch (e) {
            next(e)
        }

    }


    async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const tokens = await authService.refreshToken(refreshToken)

            authService.createCookieRefreshToken({
                res,
                token: tokens.refreshToken
            })

            return res.status(201).json(tokens)
        } catch (e) {
            next(e)
        }
    }




}

export const authController = new AuthController()