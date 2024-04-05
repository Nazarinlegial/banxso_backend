import express from "express";

const router = new express.Router()

import {mailController} from "../controller/mail.controller.js";

import {authorizationProtectedMiddleware} from "../middleware/authorization.js";
import bodyValidatorMiddleware from "../middleware/validation.js";
import applyMiddleware from "../middleware/apply.js";

import {ROLES} from "../config/msla.conf.js";
import {emailMessageSchema} from "../helper/validators/email-message.schema.js";

router.get(
    '/mail/messages',
    authorizationProtectedMiddleware([ROLES.user, ROLES.admin]),
    mailController.messages
)

router.post(
    '/mail/send',
    authorizationProtectedMiddleware([ROLES.admin]),
    bodyValidatorMiddleware(emailMessageSchema),
    mailController.sendMail
)

export default router