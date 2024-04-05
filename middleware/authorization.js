import {ApiError} from "../service/exceptions.js";
import {tokenService} from "../service/token.service.js";

export const authorizationProtectedMiddleware  = (ROLES = []) =>   function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const payload= tokenService.validateAccessToken(accessToken);
        if (!payload) {
            return next(ApiError.UnauthorizedError());
        }

        const role = payload.role
        if(!ROLES.includes(role)) {
            return next(ApiError.ForbiddenError())
        }


        req.user = payload;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}