import queryString from 'querystring'

export default (req, res, next) => {
    if (req.method.toLowerCase()==='get') {
        console.log('进入了body-parser')
        return next()
    }
    //如果是普通表单post，自己处理
    //如果是有文件的表单post，给别人处理
    if(req.headers['content-type'].startsWith('multipart/form-data')){
        return next()
    }

    let data = ''
    req.on('data', chunk => {
        data += chunk
    })
    req.on('end', () => {
        
        //手动给req对象挂载一个body属性，值就是当前表单POST请求体对象
        req.body = queryString.parse(data)
        next()
    })
}