import express from 'express'
// import queryString from 'querystring'
// import mongodb from 'mongodb'
// import fs from 'fs'
import Advert from '../models/advert'
import formidable from 'formidable'
// const MongoClient = mongodb.MongoClient
// const url = 'mongodb://localhost:27017/edu'
import config from '../config'
import { basename } from 'path'


//创建一个路由容器，将所有的路由中间件挂载给路由容器
const router = express.Router()

router.get('/advert', (req, res, next) => {
    const page = Number.parseInt(req.query.page, 10)
    //分页查询数据
    const pageSize = 5
    Advert
        .find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec((err, adverts) => {
            if (err) {
                return next(err)
            }
            Advert.count((err, count) => {
                if (err) {
                    return next(err)
                }
                const totalPage = Math.ceil(count / pageSize)//总页码=总记录数/每页显示大小
                res.render('advert_list.html', { adverts, totalPage, page })
            })
        })
})

router.get('/advert/add', (req, res, next) => {
    res.render('advert_add.html')
})


router.post('/advert/add', (req, res, next) => {
    //1. 接收表单提交数据
    // const body = req.body

    const from = new formidable.IncomingForm()
    from.uploadDir = config.uploadDir//配置formidable文件上传接收路径
    from.keepExtensions = true//配置保持文件原始的扩展

    //fields就是接收到的表单中的普通字段
    //files就是表单中文件上传上来的一些文件信息
    from.parse(req, (err, fields, files) => {
        if (err) {
            return next(err)
        }
        //在这里把files中的图片处理一下
        //就是在body中添加一个image值就是把图片上传上来的路径
        const body = fields
        body.image = basename(files.image.path)
        //2.操作数据库
        const advert = new Advert({
            title: body.title,
            image: body.image,
            link: body.link,
            start_time: body.start_time,
            end_time: body.end_time,
        })

        advert.save((err, result) => {
            if (err) {
                return next(err)
            }
            res.json({
                err_code: 0
            })
        })
    })




    //1.接收客户端提交的数据
    //2.操作数据库
    //3.发送响应信息

    //1.打开连接
    // MongoClient.connect(url, (err, client) => {
    //     if (err) {
    //         //当错误发生的时候，调用next将当前错误对象传递给next
    //         //然后就会被后面的 app.use((err, req, res, next))中间件匹配到
    //         //并且该中间件必须放在路由后面
    //         return next(err)
    //     }
    //     //2.操作数据库
    //     const db = client.db('edu')
    //     db
    //         .collection('adverts')
    //         .insertOne(req.body, (err, result) => {
    //             if (err) {
    //                 throw err
    //             }
    //             console.log(result)
    //             res.json({
    //                 err_code: 0
    //             })
    //         })
    //     //3.关闭连接
    //     client.close()
    // })
})


router.get('/advert/list', (req, res, next) => {
    Advert.find((err, docs) => {
        if (err) {
            return next(err)
        }
        res.json({
            err_code: 0,
            result: docs
        })
    })
})

// /advert/one/:advertId 是一个模糊匹配路径 可以匹配/advert/one/* 的路径形式
// 例如：/advert/one/1 /advert/one/2 /advert/one/a /advert/one/abc 等路径
// 但是 /advert/one 或者 /advert/one/a/b 是不行的
// 至于 advertId 是自己起的一个名字，可以在处理函数中通过req.params 来进行获取
router.get('/advert/one/:advertId', (req, res, next) => {
    Advert.findById(req.params.advertId, (err, result) => {
        if (err) {
            return next(err)
        }
        res.json({
            err_code: 0,
            result: result
        })
    })
})

router.post('/advert/edit', (req, res, next) => {
    Advert.findById(req.body.id, (err, advert) => {
        if (err) {
            return next(err)
        }
        const body = req.body
        advert.title = body.title
        advert.image = body.image
        advert.link = body.link
        advert.start_time = body.start_time
        advert.end_time = body.end_time
        advert.last_modified = Date.now()

        //这里的save因为内部有一个_id所以这里是不会新增数据的，而是更新已有的数据
        advert.save((err, result) => {
            if (err) {
                return next(err)
            }
            res.json({
                err_code: 0
            })
        })
    })
})


router.get('/advert/remove/:advertId', (req, res, next) => {
    Advert.remove({ _id: req.params.advertId }, err => {
        if (err) {
            return next(err)
        }
        res.json({
            err_code: 0
        })
    })
})



export default router