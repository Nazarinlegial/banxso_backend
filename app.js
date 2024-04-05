import express from "express";
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import AuthRouter from "./route/auth.js";
import MailRouter from "./route/mail.js";
import AdminRouter from "./route/admin.js"
import errorMiddleware from './middleware/exceptions.js'
import * as dotenv from "dotenv";
import {msalClient} from "./service/msla.service.js";
import {CacheService} from "./service/cache.service.js";


dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000


// Проміжне ПО для коректної роботи серверу
app.use(express.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors({
    origin: process.env.MS_CLIENT_REDIRECT_HOST,
    credentials: true
}));


// Наші роути (шляхи)
app.use('/api', AuthRouter)
app.use('/api', MailRouter)
app.use('/api', AdminRouter)


// Наш кінцевий обробник помилок для коректної відповіді серверу та його стабільної роботи
app.use(errorMiddleware);


// Запуск та прослуховуваня заданого порту нашим сервером
app.listen(PORT,  async () => {
    const cacheService = new CacheService
    const tokenStorage = msalClient.getTokenCache()

    if (cacheService.isCacheFile()) {
        const cache = await cacheService.loadTokenCache()
        tokenStorage.deserialize(cache)
        console.log('Кеш токенів загружено')
    }

    console.log('Запуск MSAL рест апі серверу.')
})

