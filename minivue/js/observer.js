class Observer{
    constructor (data) {
        this.walk(data)
    }

    walk (data) {
        if(!data || typeof data !== 'object') return

        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key]) // 为什么要加第三个参数
        })
    }

    defineReactive (obj, key, val) {
        let self = this
        // 负责收集依赖并发送通知
        let dep = new Dep()
        // 如果val是对象，把val内部的属性转换成响应式数据
        this.walk(val)
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get () {
                // 收集依赖
                Dep.target && dep.addsub(Dep.target)
                return val // 为什么不用obj[key] 用val 会死循环，这是个闭包
            },
            set (newValue) {
                if(val === newValue) return
                val = newValue
                self.walk(newValue)
                // 发送通知
                dep.notify()
            }
        })
    }
}