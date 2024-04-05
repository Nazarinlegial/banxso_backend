import * as dotenv from "dotenv"
import {join, dirname} from 'node:path'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function loadEnv(filename = ".env") {
    return dotenv.config({
        path: join(filename)
    })
}