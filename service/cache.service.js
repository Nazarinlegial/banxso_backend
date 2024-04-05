import * as path from "node:path";
import * as fs from "node:fs"
import * as fs_promise from "node:fs/promises"
import url from 'node:url'

export class CacheService {
    dir = path.join(process.cwd(), 'cache')
    filename = 'token.txt'
    filepath = path.join(this.dir, this.filename)

    async loadTokenCache() {
        try {
            return await fs_promise.readFile(this.filepath, "utf8")
        } catch (e) {
            console.error(`Помилка при зчитуванні кешу -> ${this.dir}`)
            throw e
        }

    }

    async saveTokenCache(cache) {
        this.isDir()
        try {
            await fs_promise.writeFile(this.filepath, cache, {encoding: "utf8"})
            console.log(`Новий запис до кешу ${new Date().getDate()}`)
        } catch (e) {
            console.error('Помилка при записі кешу -> ' + this.dir)
            throw e

        }

    }

    isDir() {
        if(!fs.existsSync(this.dir)) {
            fs.mkdirSync(this.dir, { recursive: true})
            console.log(`Створено директорію: ${this.dir}`)
        }
    }

    isCacheFile() {
        return fs.existsSync(this.filepath)
    }

}

