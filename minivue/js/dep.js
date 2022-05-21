class Dep {
    constructor () {
        // 存储所有的空数组
        this.subs = []

    }

    // 添加观察者
    addsub(sub) {
        if(sub && sub.update){
            this.subs.push(sub)
        }
    }


    // 发送通知
    notify () {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}