import {Db, MongoClient} from "mongodb";
import {mongoConfig} from "../config/mongo.conf.js"

// if (!process.env.MONGODB_URI) {
//     throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
// }

let db

const client = new MongoClient(mongoConfig.uri, mongoConfig.clientOptions);
let conn = client.connect();
try {
    conn = await client.connect()
} catch (e) {
    console.error(e)
}

db = conn.db(mongoConfig.dbName)

export default db;