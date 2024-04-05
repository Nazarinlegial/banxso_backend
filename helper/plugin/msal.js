import {CacheService} from "../../service/cache.service.js";
const cacheService = new CacheService()

export const msalCachePlugin = {
    beforeCacheAccess: async (cacheContext) => {
        if(cacheService.isCacheFile()) {
            const cache = await  cacheService.loadTokenCache()
            if(!cache) return
            cacheContext.tokenCache.deserialize(cache)
        }
    },
    afterCacheAccess: async (cacheContext) => {
        if(cacheContext.cacheHasChanged) {
            const cache = cacheContext.tokenCache.serialize()
            await cacheService.saveTokenCache(cache)
        }
    }
}