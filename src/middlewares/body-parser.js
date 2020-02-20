import queryString from 'querystring'

export default (req, res, next) => {
    if (!req.headers['content-length']) {
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