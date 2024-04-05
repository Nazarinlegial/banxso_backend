export class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = {}) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError(errors) {
        return new ApiError(401, 'Не авторизований', errors);
    }

    static ForbiddenError() {
        return new ApiError(403, 'Відмовленно в доступі');
    }

    static BadRequestError(message, errors) {
        return new ApiError(400, message, errors && errors);
    }

    static ServerError(message, errors) {
        return new ApiError(500,  message || 'Помилка на сервері', errors )
    }
}