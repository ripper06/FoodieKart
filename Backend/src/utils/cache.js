const cache = new Map();

//creating cache key
const createCacheKey = (params) => {
    return Object.keys(params)
        .filter(key => params[key] !== undefined && params[key] !== "")
        .sort()
        .map(key => `${key} : ${params[key]}`)
        .join("|")
};

//setting cache
const setCache = (key,data) =>{
    cache.set(key, {
        data,
        timestamp : Date.now(),
    });
};

//getting cache with expiry check
const getCache = (key) => {
    const item = cache.get(key);
    
    if(!item) return null;

    const TTL = 5*60*1000; //5min

    const isExpired = Date.now() - item.timestamp > TTL;

    if (isExpired) {
    cache.delete(key);
    return null;
    }

    return item.data;
}

//clearing cache manually
const clearCache = () => {
    cache.clear();
};

module.exports = {
    createCacheKey,
    setCache,
    getCache,
    clearCache
}