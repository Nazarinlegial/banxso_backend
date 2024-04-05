import express from "express";
import {authController} from "../controller/auth.controller.js";
const router = new express.Router()


router.get('/auth/sigin', authController.signup)

router.get('/auth/redirect', authController.redirect)
router.get('/auth/aprove/admin/:id', (req, res, next) => {

})

router.get('/auth/refreshToken', authController.refreshToken)

router.get('/auth/logout', authController.logout)

export default router

