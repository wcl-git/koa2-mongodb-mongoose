// import fs from 'fs';
// import path from 'path';
import mongoose from 'mongoose';
import Koa from 'koa';
import logger from 'koa-logger';
import session from 'koa-session';
import bodyParser from 'koa-bodyparser';
import bluebird from  'bluebird';
import router from './routers/router'; // 使用路由转发请求

const app = new Koa()

const db = 'mongodb://localhost:27017/test'

/**
 * mongoose连接数据库
 */
mongoose.Promise = bluebird;
mongoose.connect(db, (err) => {
  if(err) {
    console.log('连接数据库失败');
    return;
  }
  console.log('http://localhost:27017/test');
})

 // 这里是models 引入，是 contrllers 中不用引入 models 的方式使用
 // 获取数据库表对应的js对象所在的路径
 
// const models_path = path.join(__dirname, '/app/models')



// 已递归的形式，读取models文件夹下的js模型文件，并require
 
// var walk = function(modelPath) {
//   fs
//     .readdirSync(modelPath)
//     .forEach(function(file) {
//       var filePath = path.join(modelPath, '/' + file)
//       var stat = fs.statSync(filePath)

//       if (stat.isFile()) {
//         if (/(.*)\.(js|coffee)/.test(file)) {
//           require(filePath)
//         }
//       }
//       else if (stat.isDirectory()) {
//         walk(filePath)
//       }
//     })
// }
// walk(models_path)


app.keys = ['wuchunlei'];
app.use(logger());
app.use(session(app));
app.use(bodyParser());

// 错误统一处理
app.on('error', (err, ctx) => {
  ctx.status = err.status || 500;
  ctx.type = 'application/json';
  ctx.body = {error: '错误统一处理'}
});

// 使用路由转发请求
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(2345)
console.log('app started at port 2345...');