/*
 * @Author: your name
 * @Date: 2021-10-30 13:53:54
 * @LastEditTime: 2021-10-30 15:32:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gzhipin-server_1\DB\dbMthod.js
 */

//查询所有用户
userModel.find({id:'123'},function(err,data)  {
  console.log('###',err)
  console.log('@@@@',data)
 // res.send(data)
})
//更新用户信息
userModel.updateMany({id:'234'},{password:md5(333)},function(err,data){
     res.send({data,code:3})
})
//删除用户
userModel.remove({id:'123'},function(err){
  //res.send('删除成功')
})