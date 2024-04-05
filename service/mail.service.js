import {userService} from "./user.service.js";
import {graphService} from "./graph.service.js";
import {ApiError} from "./exceptions.js";
import {createPagePagination} from "../helper/utils/pagination.js";

class MailService {

    async messages(user_id, query) {
        let {page, take} = query

        const {user_account_id} = await userService.findUserById(user_id)


        page = page < 0 ? 0 : parseInt(page) || 1 // За замовчуваням одна сторінка
        take = take < 0 ? 1 : parseInt(take) || 10 // За замовчуваням 10 повідомлень
        const skip = (page - 1) * take

        const {count, messages} = await graphService.messages(user_account_id, {take, skip})
        const countPage = createPagePagination(count, take)

        return {
            countPage,
            messages
        }
    }


    async mail(user_id, body) {
        const {user_account_id} = await userService.findUserById(user_id)
        await graphService.sendEmailMessage(user_account_id, body)
        return {
            message: `Повідомлення успішно відправлено на електронну адресу ${body.recipient_mail}`
        }

    }
}

export const mailService = new MailService()