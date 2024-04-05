import {UserCollection} from "../db/schema/user.js";
import {ObjectId} from "mongodb";
import {ApiError} from "./exceptions.js";

export class UserService {

    async userCollection() {
        return UserCollection.collection("user")
    }

    async findUserByMsAccountId(accountId) {
        const collection = await this.userCollection()
        const accountData = await collection.findOne(
            {user_account_id: accountId}
        )

        if (!accountData) return
        return {
            ...accountData,
        }
    }

    async findUserById(userId) {
        const _id = typeof userId === "string" ? new ObjectId(userId) : userId
        const collection = await this.userCollection()

        try{
            return await collection.findOne({_id})
        } catch (e) {
            throw ApiError.BadRequestError("Не знайденно користувача.")
        }
    }

    async createUser(options = {
        userAccountId,
        role,
        ms_account,
        profile,
        geko

    }) {
        const collection = await this.userCollection()
        options.create_at = Date.now()

        try {
            const returnUser = await collection.insertOne({
                user_account_id: options.userAccountId,
                role: options.role,
                ms_account: options.ms_account,
                profile: options.profile,
                create_at: options.create_at,
                geko: options.geko
            })

            return {
                _id: returnUser.insertedId,
                user: options
            }
        } catch (error) {
            console.log(error)
        }
    }

    async updateUser(options = {
        userAccountId,
        role,
        ms_account,
        profile,
        _id,
        geko

    }) {
        const collection = await this.userCollection()
        options.update_at = Date.now()

        try {
            const userObject = JSON.parse(JSON.stringify({
                user_account_id: options.userAccountId,
                role: options.role,
                ms_account: options.ms_account,
                update_at: Date.now(),
                geko: options.geko,
                profile: options.profile,
                _id: options._id
            }))

            const user = await collection.findOne({
                $or: [
                    {user_account_id: userObject.user_account_id},
                    {_id: userObject._id},
                ]
            });


            if (user) {
                const returnUser = await collection.updateOne({
                    _id: user._id
                }, {
                    $set: {
                        ...userObject
                    }
                });

                return {
                    id: returnUser?.upsertedId,
                    user: options
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

}

export const userService = new UserService()