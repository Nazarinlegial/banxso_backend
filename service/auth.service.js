import {tokenService} from "./token.service.js";
import {userService} from "./user.service.js";
import {msalClient} from "./msla.service.js";
import {ApiError} from "./exceptions.js";
import {UserDto} from "../dto/user.js";

class AuthService {

    async logout(token) {
        const payload = tokenService.validateRefreshToken(token)
        const user = await userService.findUserById(payload.user_id)

        if(!user) return
        const account = await msalClient.getTokenCache().getAccountByHomeId(user.user_account_id)

        if(!account) return
        await msalClient.getTokenCache().removeAccount(account)
    }

    async refreshToken(token) {
        if(!token) throw ApiError.UnauthorizedError()

        const payload = tokenService.validateRefreshToken(token)
        const isToken = await tokenService.findRefreshToken(token)

        if(!payload || !isToken) throw ApiError.UnauthorizedError()
        const user = await userService.findUserById(payload.user_id)
        const newPayload = new UserDto({
            id:  user._id,
            role: user.role,
            profile: user.profile
        })

        const newTokens = tokenService.generateTokens( { ...newPayload })
        await tokenService.saveToken(user._id, newTokens.refreshToken)

        return newTokens
    }

    createCookieRefreshToken(data = {token, res}) {
        data.res.cookie('refreshToken', data.token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
    }
}


export const authService = new AuthService()