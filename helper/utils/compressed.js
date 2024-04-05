import * as zlib from 'node:zlib';

const compressed = function (object) {
    const text = JSON.stringify(object)
    return Buffer.from(text).toString('base64')
}

const decompressed = function (textObj) {
    if(!textObj) return
    const decompress = Buffer.from(textObj, 'base64')
    return JSON.parse(decompress.toString())
}


export {compressed, decompressed}