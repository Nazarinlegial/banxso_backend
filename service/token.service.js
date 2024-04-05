import {RefreshTokenCollection} from "../db/schema/refresh-token.js";
import jwt from 'jsonwebtoken'


export class TokenService {

    generateTokens(payload = {role, profile, user_id}) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
            expiresIn: '10m'
        })
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
            expiresIn: '15d'
        })

        return {
            accessToken, refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.ACCESS_SECRET)
        } catch (error) {
            return null
        }
    }


    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.REFRESH_SECRET)
        } catch (error) {
            return null
        }
    }

    async saveToken(userId, token) {
        const collection = await this.createCollection()

        const tokenObject = new RefreshTokenCollection({
            token,
            user_id: userId,
            update_at: Date.now()
        })




        return await collection.updateOne(
            {
                $or: [
                    {
                        token:  token
                    },
                    {
                        user_id: userId
                    }
                ]

            },
            {
                $set: {
                    ...tokenObject
                }
            },
            {
                upsert: true
            }
        )
    }

    async removeRefreshToken(refreshToken) {
        const collection = await this.createCollection()

        return collection.deleteOne({
            token: refreshToken
        })
    }

    async findRefreshToken(refreshToken)  {
        try {
            const collection = await this.createCollection()
            return collection.findOne({
                token: refreshToken
            })
        } catch (e) {
            return null
        }
    }


    async createCollection() {
        return RefreshTokenCollection.collection("refresh_token")
    }

}

export const  tokenService = new TokenService()