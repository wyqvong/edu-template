import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/edu')

//1.创建一个模型架构，设计数据结构和约束
const advertSchema = mongoose.Schema({
    image: { type: String, required: true },
    link: { type: String, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    create_time: { type: Date, default: Date.now },
    last_modified: { type: Date, default: Date.now },
})
//2.通过mongoose.model（）将架构发布为一个模型
export default mongoose.model('Advert', advertSchema)



//3.通过操作模型去操作你的数据库 保存实例数据对象
