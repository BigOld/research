
let _Vue = null
export default class VueRouter {
    static install(Vue) {
        // 1.判断当前插件是否已经被安装
        if(VueRouter.install.installed){
            return
        }
        VueRouter.install.installed = true
        // 2.把Vue构造函数记录到全局变量
        _Vue = Vue
        // 3.把创建Vue实例时候传入的router对象注入到Vue实例上
        // 混入
        _Vue.mixin({
            beforeCreate() {
                if (this.$options.router) {
                    _Vue.prototype.$router = this.$options.router
                    this.$options.router.init()
                }
            },
        })
    }
    constructor (options) {
        this.options = options
        this.routeMap = {}
        this.data = _Vue.observable({ // 注册响应式数据
            current: "/"
        })
    }

    init() {
        this.createRouteMap()
        this.initComponents(_Vue)
    }

    createRouteMap() {
        // 遍历所有的路由规则，把路由规则解析成键值对的形式
        this.options.routes.forEach(route => {
            this.routeMap[route.path] = route.component
        })
    }

    initComponents (Vue) {
        const self = this
        Vue.component('router-link', {
            props: {
                to: String
            },
            render(h){
                return h('a', {
                    attrs: {
                        href: this.to
                    },
                    on: {
                        click: this.clickHander
                    }
                }, [this.$slots.default])
            },
            methods: {
                clickHander(e) {
                    history.pushState({}, '', this.to) // 改变浏览器地址栏，并且不向服务器发请求
                    this.$router.data.current = this.to
                    e.preventDefault()
                }
            },
            // template: '<a :href="to"><slot></slot></a>'
        })
        Vue.component('router-view', {
            render(h) {
                const component = self.routeMap[self.data.current]
                return h(component)
            }
        })
    }
}