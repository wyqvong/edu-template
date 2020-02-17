import express from 'express'

//创建一个路由容器，将所有的路由中间件挂载给路由容器
const router = express.Router()


router.get('/', (req, res) => {
    res.render('index.html')
})

router.post('/advert/add', (req, res, next) => {
    console.log(req.body)
})


export default router