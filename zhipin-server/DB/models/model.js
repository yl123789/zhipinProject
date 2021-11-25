//引入mongoose
const mongoose =require('mongoose')
//引入模型对象
const Scema =mongoose.Schema
//包含n个类型的Model对象，用来使用数据库的方法
/*2. 定义出对应特定集合的Model并向外暴露*/
// 2.1. 字义UserSchema(描述文档结构(文档约束规则))
const userSchema = mongoose.Schema({
  username: {type: String, required: true}, // 用户名
  password: {type: String, required: true}, // 密码
  type: {type: String, required: true}, // 用户类型: dashen/boss
  header: {type: String}, // 头像名称
  post: {type: String}, // 职位
  info: {type: String}, // 个人或职位简介
  company: {type: String}, // 公司名称
  salary: {type: String} // 月薪
})
//暴露userModel模型对象
exports.userModel = mongoose.model('users',userSchema)
// 定义 chats 集合的文档结构
const chatSchema = mongoose.Schema({
  from: {type: String, required: true}, // 发送用户的 id
  to: {type: String, required: true}, // 接收用户的 id
  chat_id: {type: String, required: true}, // from 和 to 组成的字符串
  content: {type: String, required: true}, // 内容
  read: {type:Boolean, default: false}, // 标识是否已读
  create_time: {type: Number} // 创建时间
})
// 定义能操作 chats 集合数据的 Model模型对象
const ChatModel = mongoose.model('chat', chatSchema)
// 向外暴露 chatModel
exports.ChatModel = ChatModel