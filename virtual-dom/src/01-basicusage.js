import { init } from "snabbdom/build/package/init"
import { h } from "snabbdom/build/package/h"

const patch = init([])

let vnode = h('div#container.cls', 'hello world')

let app = document.querySelector('#app')

let oldVnode = patch(app, vnode)

vnode = h('div#container.xxx', 'hello Snabbdom')

patch(oldVnode, vnode)