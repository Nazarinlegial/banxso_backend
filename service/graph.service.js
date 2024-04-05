import {
    BASE_ROLE, MS_CLIENT_URI,
    MS_REDIRECT_PATH,
    MS_SCOPES,
    MS_SERVER_URI
} from "../config/msla.conf.js";
import {msalClient} from "./msla.service.js";
import {userService} from "./user.service.js";
import {getAuthenticatedGraphClient} from "./graphClient.js";
import {tokenService} from "./token.service.js";
import {UserDto} from "../dto/user.js";
import {ApiError} from "./exceptions.js";
import {ERROR_TYPES} from "../helper/constants/error.js";


class GraphService {

    async redirect(code) {
        const tokenRequest = {
            code: code,
            scopes: MS_SCOPES,
            redirectUri: new URL(MS_REDIRECT_PATH, MS_SERVER_URI).toString()
        }

        const response = await msalClient.acquireTokenByCode(tokenRequest)
        const client = getAuthenticatedGraphClient({
            msalClient: msalClient,
            redirectUri: new URL("/", MS_CLIENT_URI).toString(),
            msAccountId: response.account.homeAccountId
        })

        const user = await userService.findUserByMsAccountId(response.account.homeAccountId)

        if (!user) {
            const profile = await client.api('/me').select("mail").get()
            const getUser = await userService.createUser({
                    userAccountId: response.account.homeAccountId,
                    profile: profile,
                    role: BASE_ROLE,
                }
            )

            const payload = new UserDto({
                role: BASE_ROLE,
                profile: profile,
                id: getUser._id
            })

            const tokens = tokenService.generateTokens({...payload})
            await tokenService.saveToken(getUser._id, tokens.refreshToken)
            return tokens


        } else {
            const payload = new UserDto({
                role: user.role,
                profile: user.profile,
                id: user._id
            })

            const tokens = tokenService.generateTokens({...payload})
            await tokenService.saveToken(user._id, tokens.refreshToken)
            return tokens
        }
    }


    async messages(accountId, {take = 10, page = 0, skip = 0, directory}) {
        const client = getAuthenticatedGraphClient({
            msalClient: msalClient,
            msAccountId: accountId
        })

        const mailMessages = await client.api('/me/messages')
            .count(true)
            .skip(skip)
            .top(take)
            .get()

        const count = mailMessages["@odata.count"]
        const messages = mailMessages.value

        return {
            count,
            messages
        }

    }

    async sendEmailMessage(accountId, {recipient_mail, subject, body}) {
        const client = getAuthenticatedGraphClient({
            msalClient: msalClient,
            msAccountId: accountId
        })

        await client.api('/me/sendMail').post({
            "message": {
                "subject": subject,
                "body": {
                    "contentType": "Text",
                    "content": body
                },
                "toRecipients": [
                    {
                        "emailAddress": {
                            "address": recipient_mail
                        }
                    }
                ]
            }
        })
    }
}

export const graphService = new GraphService()

