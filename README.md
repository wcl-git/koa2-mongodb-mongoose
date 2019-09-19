# koa2-mongodb-mongoose
koa2-mongodb-mongoose 为前端提供服务器接口
mongodb 安装及启动，参考 https://github.com/wcl-git/express-mongodb-mongoose/blob/master/doc/mongodb.md

mongoose 一些基本思路，参考 https://github.com/wcl-git/express-mongodb-mongoose/blob/master/doc/mongoose.md
对于  mongoose 使用，这个也有项目以另一种方式使用。但是思路是不变的，只是代码管理方式不同

 本项目使用 babel7.x, 全项目使用 es6、7写法

## 目录说明

```
.
├── README.md                   //项目说明文件
├── app.js                      // server 文件，用于启动服务器的主文件
├── index.js                      // server启动文件，用于babel编译 app.js 文件的，也是服务器启动文件
├── .babelrc                     // babel 配置
├── ruoters                     // 路由
│   └── router.js               // 路由文件
├── app                         // 项目主要逻辑
│   ├── models                  //  存放mongoose model schema 文件夹
│   │ └── user.js
│   │
│   ├── controllers             //  接口和操作数据库的主要逻辑
│   │ ├── app.js
│   │ └── user.js
│   │
│   └── dbhelper               // 操作数据库的一些公共方法，把 controllers 里面接口操作数据库的方法抽离出来
│    └── userHelper.js
│  
│   
```

这里曾经有一个问题困扰这我，就是在 models 定义的 model 比如名字叫 user
```
var User = mongoose.model('User', UserSchema)

module.exports = User
```
只需要在 app.js 中把models 下面的文件全部引入 
在 controller 目录下面 比如 user.js 只需下面方式引入就可以

```
var User = mongoose.model('User')
```
可以不用在controller 中引入 models 下对应的文件模块，这样达到 controller 和models分开。
为什么可以这样？
原来 mongoose.model 第一个参数是 数据库中的集合名称, 不存在会创建。存在就不会创建，直接使用已存在的数据库中的集合。
所以，``var User = mongoose.model('User')；``相当于就是 获取到数据库中 User 的集合。当时这种用法前提是 models定义的集合一定要在之前引入。也就上上面说的 在app.js 中把models的所有模块先引入在把 router 引入，而 router 内引入 controller。

当然，在 controllers 里面把 models引入也是可以的，按这个方式使用的话，app.js里面就不用引入 models 了
```
import User from '../models/user';
```
上面两种方式代码里都已经存在，第一种方式已经在代码离注释，如果用第一种，可以放开注释