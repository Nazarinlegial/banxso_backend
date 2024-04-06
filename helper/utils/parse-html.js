import {parse} from 'node-html-parser'
import DOMPurify from "isomorphic-dompurify";

export function transformMailHtml(page) {
    const root = parse(page)
    const body = root.querySelector('body').innerHTML
    return `<section class="mail-message">${body}</section>`
}

export const cleanXSSHtml = (html) => {
    return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } })
}