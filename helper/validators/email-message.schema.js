import Joi from "joi";

export const emailMessageSchema = Joi.object({
    recipient_mail: Joi.string().email().required().messages({
        'string.empty': 'Поле "recipient_mail" не може бути порожнім',
        'string.email': 'Поле "recipient_mail" повинно містити дійсну адресу електронної пошти',
        'any.required': 'Поле "recipient_mail" є обов’язковим'
    }),
    subject: Joi.string().allow('').default('').optional(),
    body: Joi.string().required().messages({
        'string.empty': 'Поле "body" не може бути порожнім',
        'any.required': 'Поле "body" є обов’язковим'
    })
})