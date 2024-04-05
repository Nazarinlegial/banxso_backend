export const createPagePagination = (count, take) => {
    let page = count / take
    page = page > 1 ? Math.floor(page) : 1

    return page
}