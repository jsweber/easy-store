//author du by 2019 6/11

//默认存储3天
const ThreeDays = 1000 * 60 * 60 * 24 * 3

const createItem = (value, expires=Date.now() + ThreeDays) => JSON.stringify({
    value,
    expires
})

//暂时支持sessionStorage, localStorage, cookie请先实现setItem, getItem, removeItem, clear
class EasyStore{
    constructor(store){
        this.store = store || window.localStorage
        this.cache = Object.create(null)
    }

    setItem(key, val, expires){
        this.store.setItem(key, createItem(val, expires))
    }

    getItem(key){
        if (typeof this.cache[key] !== 'undefined') {
            let cacheItem = this.cache[key]
            if (cacheItem.expires < Date.now()) {
                //过期删掉
                this.removeItem(key)
                return null
            }
            return cacheItem
        }
        let item = this.store.getItem(key)
        if (!item) return null

        item = JSON.parse(item)
        if (item.expires < Date.now()) {
            this.removeItem(key)
            return null
        }
        
        return this.cache[key] = item
    }

    removeItem(key){
        if (typeof this.cache[key] !== 'undefined') this.cache[key] = undefined
        this.store.removeItem(key)
    }

    clear(){
        this.cache = Object.create(null)
        this.store.clear()
    }

}

export default EasyStore
