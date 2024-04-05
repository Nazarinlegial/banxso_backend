import {mailService} from "../service/mail.service.js";

class MailController {

    async messages(req,res,next) {
        try {
            const {user_id} = req.user
            const response = await mailService.messages(user_id, req.query)
            res.json(response)
        } catch (e) {
            next(e)
        }
    }

    async sendMail(req,res,next) {
        try {
            const {body} = req
            const {user_id} = req.user
            const response = await mailService.mail(user_id, body)
            res.status(200).json(response)
        } catch (e) {
            next(e)
        }
    }
}

export const mailController = new MailController()