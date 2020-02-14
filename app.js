const express = require(express)

const app = express()

app.get('/', (req, res) => {
    res.end('hello world')
})


app.listen(3000,()=>{
    console.log('server is running at port 3000')
})