const path = require('path')
const jsonServer = require('json-server')
const os = require('os')
const server  = jsonServer.create()
// const router = jsonServer.router(path.join(__dirname, '../data.json'))
const middlewares = jsonServer.defaults()

// 可读写临时临时文件
const dbFilename = path.join(os.tmpdir(), 'db.json')

if(!fs.existsSync(dbFilename)){
    fs.writeFileSync(dbFilename, JSON.stringify({
        "posts": [
            { "id": 1, "title": "json-server", "author" : "typicode" }
        ],
        "comments": [
            {"id": 1, "body": "some comment"}
        ]
    }))
}

const router = jsonServer.router(dbFilename)

server.use(middlewares)
server.use(router)

module.exports = server