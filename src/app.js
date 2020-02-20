import express from 'express'
import config from './config'
import nunjucks from 'nunjucks'
import router from './router'
import queryString from 'querystring'
import bodyParser from './middlewares/body-parser'
import errorLog from './middlewares/error-log'

const app = express()

app.use('/node_modules', express.static(config.node_modules_path))
app.use('/public', express.static(config.public_path))

//配置使用nunjucks模板引擎
nunjucks.configure(config.viewPath, {
    autoescape: true,
    express: app
})

//挂载解析处理表单POST的请求体中间件
//表单POST请求可能会携带大量的数据，所以进行请求提交的时候会分为多次提交
//具体分为多少次取决于数据量的大小
//在node中，对于处理这种不确定的数据，使用事件的形式处理
app.use(bodyParser)




//挂载路由容器(路由容器中组织了网站功能处理路由中间件)
app.use(router)

app.use(errorLog)


app.listen(3000, () => {
    console.log('server is running at port 3000')
})