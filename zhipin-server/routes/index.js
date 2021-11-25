/*
 * @Author: your name
 * @Date: 2021-10-29 17:49:25
 * @LastEditTime: 2021-10-30 16:29:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gzhipin-server_1\routes\index.js
 */
const express = require('express');
const md5 = require('blueimp-md5')
const router = express.Router();
const db = require('../DB/db_test')
const {
  userModel,
  ChatModel
} = require('../DB/models/model')
const filter ={password:0,__v:0}
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
//连接数据库
db((err) => {
  if(err) {
    return err
  }
})


//注册路由功能的实现
/*
1.path:为register
2.请求方式：post
3.接受请求体参数username，password,type
4.判断是否为已注册的账户
如果用户名已存在注册失败
如果数据库中没有该用户名，注册成功。

* */
router.post('/register', function (req, res) {
  //获取请求体参数
  const {
    username,
    type,
    password
  } = req.body;
  //console.log(username,password)
 {
    //查询数据库，判断用户是否已存在
    userModel.findOne({
      username
    }, filter,(err, user) => {
      if (user) {
        console.log({msg:'用户已存在'})
        res.send({
          code: 1,
          msg: '用户名已存在'
        })
      } else {
        //增加新用户到数据库
        userModel.create({
          username,
          type,
          password: md5(password),
        }, function (err, user) {
          if (err) {
            console.log(err)
            res.send({
              code: 1,
              msg: err
            })
          } else {
            const data = {
              username,
              type,
              _id: user._id
            }
            console.log(data)
            //设置cookie，用于一天免登录功能实现
            res.cookie('user_id', user._id, {
              maxAge: 1000 * 60 * 60 * 24
            })
            res.send({
              code: 0,
              data
            })
          }

        })
      }
    })

  }


})
//登录路由功能实现
/* *
1.path:为register
2.请求方式：post
3.接受请求体参数username，password,type
 **/
router.post('/login',(req,res) => {
  //获取请求体参数
  const {username,password} = req.body
//连接数据库成功，处理数据
    userModel.findOne({username,password:md5(password)},filter, (err,user) => {
      if(user){
        res.cookie('user_id',user._id,{maxAge:1000*60*60*24})
        res.send({code:0,data:user})
      }else{
        res.send({code:1,msg:'用户名或密码不正确！！！'})
      }
    })

})
//更新（boss/niu'ren）用户信息路由功能实现
/* *
1.path:为update
2.请求方式：post
3.接受请求体参数：
           header
           post
           info
           company
          salary
 **/
router.post('/update',(req,res) => {
  //获取请求体参数
  const user = req.body
  //获取cookies中的user_id
  const user_id = req.cookies.user_id
  if(!user_id){
    return res.send({code:1,msg:'请重新登录'})
  }else{
    userModel.findByIdAndUpdate({_id:user_id},user,(err,oldUser) =>{
      console.log(oldUser,'1111')
          if(err) {//user用于存更新之后信息,olduser存的是未更新之前的user信息
            //未查询成功，说明cookie带来的id信息无效或者被篡改，删除cookie
            res.clearCookie('user_id')
            return res.send({code:1,msg:'请重新登录'})
          }else{
            //获取更新后的user信息
            const{ header, post, info, company, salary} = user
            //Object.assign用于合并对象,更新header,post,info, company, salary信息
          const data= Object.assign(oldUser,{ header,post,info, company, salary})
            res.send({code: 0, data})
          }
    })
  }
})
//获取用户所有个人信息路由功能实现
/* *
1.path:为user
2.请求方式：get
3.接受请求体参数：根据cookies中携带的user_id
4.返回根据user_id所匹配到的用户所有个人信息
 **/
router.get('/user',(req,res) => {
  //获取cookies中的user_id
  const user_id = req.cookies.user_id
  if(!user_id){
    return res.send({code:1,msg:'请重新登录'})
  }else{
    userModel.findOne({_id:user_id},(err,data) =>{
      if(!data){
        return res.send({code:1,msg:'请重新注册'})
      }else{
        return res.send({code:0,data})
      }
    })
  }

})
//获取用户列表路由功能实现
/* *
1.path:为userlist
2.请求方式：get
3.接受请求体参数：用户的类型type
4.返回一个用户列表【存在数组中】
 **/
router.get('/userlist',(req,res) => {
    //获取请亲体参数
  const {type} = req.query
  if(!type) {
    res.send({code: 1,msg:"无注册过的用户"})
  }else{
    userModel.find({type},filter,(err,users) =>{//users为查到的用户列表，存在数组里
       res.send({code:0,data:users})
    })
  }

})
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
/*获取当前用户所有相关聊天信息列表
---- 响应参数形式：users：{user_id:{header，username}}， chatMsgs：【{user_id发送或接受的一条消息}，{user_id发送或接受的一条消息}......】
*/
router.get('/msglist', function (req, res) {
// 获取 cookie 中的 user_id
  const user_id = req.cookies.user_id
// 查询得到所有 user 文档数组
  userModel.find(function (err, userDocs) {
// 用对象存储所有 user 信息: key 为 user 的_id, val 为 name 和 header 组成的 user 对象,对象存的数据在解构赋值时根据属性名来匹配相对应值，
    //而用数组在结构赋值时需要按位置来匹配值，所以需要遍历来找到需要的值。
    const users = {} // 对象容器
    userDocs.forEach(doc => {
      users[doc._id] = {username: doc.username, header: doc.header}
    })
    /*查询 user_id 相关的所有聊天信息
    参数 1: 查询条件
    参数 2: 过滤条件
    参数 3: 回调函数
    */
    ChatModel.find({'$or': [{from: user_id}, {to: user_id}]}, filter, function (err, chatMsgs) {
// 返回包含所有用户和当前用户相关的所有聊天消息的数据
      res.send({code: 0, data: {users, chatMsgs}})
    })
  })
})
/*修改指定消息为已读【即一个用户接收的消息读了后改为已读状态】
*/
router.post('/readmsg', function (req, res) {
// 得到请求中的 from 和 to
  const from = req.body.from
  const to = req.cookies._id
  /*更新数据库中的 chat 数据
  参数 1: 查询条件
  参数 2: 更新为指定的数据对象过滤掉已读信息【{read: true}】
  参数 3: 是否 1 次更新多条，更新多条指定{multi: true}, 默认只更新一条
  参数 4: 更新完成的回调函数，将read改为true
  */
  ChatModel.updateMany({from, to, read: false}, {read: true}, {multi: true}, function (err, doc) {
    console.log('/readmsg1', doc.modifiedCount)
    res.send({code: 0, data: doc.modifiedCount}) // 需要更新的数量【未查看前未读信息的数量，查看完成更新】
  })
})

module.exports = router;