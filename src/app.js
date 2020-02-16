import express from 'express'
import config from './config'
import nunjucks from 'nunjucks'

const app = express()

app.use('/node_modules', express.static(config.node_modules_path))
app.use('/public', express.static(config.public_path))

//配置使用nunjucks模板引擎
nunjucks.configure(config.viewPath, {
    autoescape: true,
    express: app
})



app.get('/', (req, res) => {
    res.render('index.html')
})


app.listen(3000, () => {
    console.log('server is running at port 3000')
})