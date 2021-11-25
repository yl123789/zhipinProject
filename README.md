## 一、 项目开发准备
    1. 项目描述:
                1) 整体业务功能：
                      此项目为一个前后台分离的招聘的 SPA, 包括前端应用和后端应用
                2)功能模块：
                      包括用户注册/登录,用户信息完善， 牛人/老板列表, 实时聊天等模块
                3)主体的技术：
                      前端: 使用 React 全家桶+ES6+Webpack 等技术
                      后端: 使用 Node + express + mongodb + socketIO 等技术
                      前后台交互：通过ajax向后台发送请求（axios+async/await），通过postman测试API接口
                      模块化：ES6+babel（转译ES6模块化语法以及浏览器不兼容的ES6高级语法）
                      项目构建/工程化：webpack（打包前端资源），react-create-app，eslint（语法检查）
                      其他相关库：blueimp-md5（加密），js-cookie（ 操作浏览器端 cookie 数据），rc-queue-anim（ 添加聊天的页面的动画效果）

                1) 开发模式：
                       采用模块化、组件化、工程化的模式开发

## 二、 git管理项目的常用操作
    1. 创建本地仓库
        创建.gitignore配置文件
        git init
        git add *
        git commit -m "xxx"
    2. 创建github远程仓库
        New Repository
        指定名称
        创建
    3. 将本地仓库推送到远程仓库
        git remote add origin https://github.com/zxfjd3g/170612_JSAdvance.git 关联远程仓库
        git push origin master
    
    4. push本地的更新 
        git add *
        git commit -m "xxx"
        git push origin master
    
    5. pull远程的更新
            git pull origin master
            
    6. 克隆github上的项目:
        git clone https://github.com/zxfjd3g/xxx.git

## 三、 搭建项目
    1. 使用create-react-app脚手架创建模板项目(工程化)
    2. 引入antd-mobile, 并实现按需打包和自定义主题
    3. 引入react-router-dom(v4): 
        HashRouter/Route/Switch
        history: push()/replace()【不保存浏览记录，相当于无痕浏览】
    4. 引入redux
        redux/react-redux/redux-thunk【处理异步action】
        redux: createStore()/combineReducers()/applyMiddleware()
        react-redux: <Provider store={store}> / connect()(Xxx)
        4个重要模块: reducers/store/actions/action-types

## 四、 登录/注册界面
    1. 创建3个1级路由: main/login/register
    2. 完成登录/注册的静态组件
        antd组件: NavBar/WingBlank/WhiteSpace/List/InputItem/Radio/Button
        路由跳转: this.props.history.replace('/login')
        收集表单输入数据: state/onChange/变量属性名

## 五、 实现简单的后台
    1. 使用webstorm创建基于node+express的后台应用
    2. 根据需求编写后台路由
    3. 使用postman测试后台接口
    4. 使用nodemon实现后台应用的自动重启动
    5. 使用morgan监测前台发送请求的日志
    6. 路由中回调函数的3步: 读取请求参数/处理/返回响应数据
    
    
## 六、 使用mongoose操作数据库
    1. 连接数据库
    2. 定义schema【约束数据库中的字段】和Model【模型对象】
    3. 通过Model函数对象或Model的实例的方法对集合数据进行CRUD操作 
    
## 七、 注册/登录后台处理
    1. models.js
        连接数据库: mongoose.connect(url)
        定义文档结构: schema
        定义操作集合的model: UserModel
    2. routes/index.js
        根据接口编写路由的定义
        注册: 流程
        登录: 流程
        响应数据结构: 成功的响应：{code: 0, data: user}, 失败的响应：{code: 1, msg: 'xxx'}
    
## 八、 注册/登录前台处理
    1. ajax
        ajax请求函数(通用): 使用axios库, 返回的是promise对象
        后台接口请求函数: 针对具体接口定义的ajax请求函数, 返回的是promise对象
        代理: 跨域问题通过配置代理解决
        await/async: 同步编码方式实现异步ajax请求 
    2. redux
        store.js
          生成并暴露一个store管理对象
        useReducer.js
          包含n个reducer函数
          根据老state和指定action来产生返回一个新的state然后保存到store对象
        actions.js
          包含n个action creator函数
          同步action: 返回一个action对象({type: 'XXX', data: xxx})
          异步action: 返回一个函数: disptach => {执行异步代理, 结束时dispatch一个同步action}
        actionTypes.js
          action的type名称常量
    3. component
        UI组件: 
            组件内部没有使用任何redux相关的API，只负责展示页面
            通过props接收容器组件传入的从redux获取数据
        容器组件
            connect(
              state => ({user: state.user}),
              {action1, action2}
            )(UI组件)


## 九、 实现user信息完善功能
    1. 用户信息完善界面路由组件: 
        组件: niuren-info/boss-info/header-selector
        界面: Navbar/List/Grid/InputItem/Button/TextareaItem
        收集用户输入数据: onChange监听/state 
        注册2级路由: 在main路由组件
    2. 登陆/注册成功后的跳转路由计算
        定义工具函数
        计算逻辑分析
    3. 后台路由处理
    4. 前台接口请求函数
    5. 前台redux
        action-types
        异步action/同步action
        reducer
    6. 前台组件
        UI组件包装生成容器组件
        读取状态数据
        更新状态

## 十、 搭建整体界面(上)
    1. 登录状态维护
        后台将userid保存到cookie中
        前台读取cookie中的userid
        redux中管理user信息状态
        
    2. 实现自动登录
        整体逻辑分析
        ajax请求根据cookie中的userid查询获取对应的user信息


## 十一、 搭建整体界面(下)
    封装导航路由相关数据(数组/对象)
    抽取底部导航组件
    非路由组件使用路由组件API whitRoute
    
## 2. 个人中心
    读取user信息显示
    退出登录
    
## 3. 用户列表
    为大神/老板列表组件抽取用户列表组件
    异步读取指定类型用户列表数据
        后台路由
        api
        redux
        component

## 4. socket.io
    实现实时聊天的库
    包装的H5 WebSocket和轮询---> 兼容性/编码简洁性
    包含2个包:
      socket.io: 用于服务器端
      socket.io-client: 用于客户端
    基本思想: 远程自定义事件机制
        on(name, function(data){}): 绑定监听
        emit(name, data): 发送消息
        
        io: 服务器端核心的管理对象
        socket: 客户端与服务器的连接对象


## 十二、 聊天组件功能:
    后台接口
    chat静态组件
    发送消息与接收消息
    获取消息列表显示
    接收消息显示
    完善列表显示


## 1. 消息列表
    对消息进行分组保存, 且只保存每个组最后一条消息
    对于对象容器和数组容器的选择
    数组排序
    
## 2. 未读消息数量显示 
    每个组的未读数量统计
    总未读数量统计显示
    查看消息后, 更新未读数量

