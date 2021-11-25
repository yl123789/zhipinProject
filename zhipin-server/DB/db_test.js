//引入mongoose
const mongoose =require('mongoose')
function monGo(callBack) {
    //连接数据库
    mongoose.connect('mongodb://localhost:27017/blinkzhipin')
//绑定监听
    const conn = mongoose.connection
    conn.on('open',(err) => {
            if(!err){
                console.log('数据库连接成功')
                callBack()
            }else{
                console.log('数据库连接失败',err)
                callBack(err);
            }
        }
    )
}
module.exports = monGo