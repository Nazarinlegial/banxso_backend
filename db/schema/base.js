import db from "../mongodb.js";

export class IBaseCollection{
    create_at
    update_at

    constructor({create_at = undefined, update_at = undefined}) {
        this.create_at = create_at
        this.update_at = update_at
    }

    static async collection(collectionName) {
        return await db.collection(collectionName)
    }
}