import {ApiError} from "../service/exceptions.js";

export default function (...middlewares) {
    return (req, res, next) => {
        try {
            const chainRunner = middlewares.reduceRight(
                (nextInChain, currentMiddleware) => () => currentMiddleware(req, res, nextInChain),
                next
            );
            chainRunner();
        } catch (e) {
            throw ApiError.BadRequestError("")
        }
    };


};