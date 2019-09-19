
// 用于封装controllers的公共方法

// import mongoose from 'mongoose';
// var User = mongoose.model('User')  //  当app.js中引入 models 可以这样用
import User from '../models/user';

const hasBody = async (ctx, next) => {
  const body = ctx.request.body || {}
  // console.log(this.query.phonenumber)
  console.log(body)

  if (Object.keys(body).length === 0) {
    ctx.body = {
      success: false,
      err: '参数缺失'
    }

    return next
  }

  await next()
}

// 检验token
const hasToken = async (ctx, next) => {
  let accessToken = ctx.query.accessToken

  if (!accessToken) {
    accessToken = ctx.request.body.accessToken
  }

  if (!accessToken) {
    ctx.body = {
      success: false,
      err: '令牌失效'
    }

    return next
  }

  let user = await User.findOne({
    accessToken: accessToken
  })
  .exec()

  if (!user) {
    ctx.body = {
      success: false,
      err: '用户没登录'
    }

    return next
  }

  ctx.session = ctx.session || {}
  ctx.session.user = user

  await next()
}

export { hasBody, hasToken };