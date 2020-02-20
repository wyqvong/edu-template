import express from 'express'
import queryString from 'querystring'
import mongodb from 'mongodb'
import fs from 'fs'


const MongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017/edu'

//创建一个路由容器，将所有的路由中间件挂载给路由容器
const router = express.Router()


router.get('/', (req, res, next) => {
    res.render('index.html')
})



router.post('/advert/add', (req, res, next) => {
    //1.接收客户端提交的数据
    //2.操作数据库
    //3.发送响应信息

    //1.打开连接
    MongoClient.connect(url, (err, client) => {
        if (err) {
            //当错误发生的时候，调用next将当前错误对象传递给next
            //然后就会被后面的 app.use((err, req, res, next))中间件匹配到
            //并且该中间件必须放在路由后面
            return next(err)
        }
        //2.操作数据库
        const db = client.db('edu')
        db
            .collection('adverts')
            .insertOne(req.body, (err, result) => {
                if (err) {
                    throw err
                }
                console.log(result)
                res.json({
                    err_code: 0
                })
            })
        //3.关闭连接
        client.close()
    })
})


export default router