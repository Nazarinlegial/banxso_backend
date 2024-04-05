import express from "express";
import {authorizationProtectedMiddleware} from "../middleware/authorization.js";
import {ROLES} from "../config/msla.conf.js";
const router = express.Router()

router.get('/admin/list', authorizationProtectedMiddleware([ROLES.admin]))

router.get('/admin/update-role', authorizationProtectedMiddleware([ROLES.admin]))


export default router