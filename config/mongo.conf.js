import {loadEnv} from '../helper/utils/env.js'
import {ServerApiVersion} from "mongodb";
loadEnv()

export const mongoConfig = {
    uri: `mongodb+srv://${encodeURIComponent(process.env.MONGODB_USER)}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@testcluster.aozzrim.mongodb.net/?retryWrites=true&w=majority&appName=testCluster`,
    clientOptions: {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
        }
    },
    dbName: process.env.MONGODB_DBNAME
}