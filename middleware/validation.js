import {ERROR_TYPES} from "../helper/constants/error.js";
import {ApiError} from "../service/exceptions.js";

export default function bodyValidatorMiddleware(schema) {
    return (req, res, next) => {
        const {value, error} = schema.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = {
                error: ERROR_TYPES.VALIDATION_ERROR,
            }

            if (error.details) {
                errors.details = error.details.map(detail => ({
                    message: detail.message,
                    path: detail.path.join('.')
                }))
            }

            return next(ApiError.BadRequestError("Помилка при валідації тіла запиту.", errors))
        }

        req.body = value
        next()
    }
}