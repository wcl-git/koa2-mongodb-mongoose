import xss from "xss";
// import mongoose from 'mongoose';

import User from "../models/user";
import uuid from "uuid";
// const userHelper = require('../dbhelper/userHelper')
import userHelper from "../dbhelper/userHelper";

// const User = mongoose.model('User')  // 当app.js中已经引入 models 可以这样用

// 注册新用户
const signup = async (ctx, next) => {
  const phoneNumber = xss(ctx.request.body.phoneNumber.trim());
  let user = await User.findOne({
    phoneNumber: phoneNumber
  }).exec();
  console.log(user);
  if (user) {
    console.log("数据库已经存在该号码记录");
    console.log(ctx.status);
    ctx.body = {
      success: false,
      data: user
    };
    return;
  }
  const verifyCode = Math.floor(Math.random() * 10000 + 1);
  if (!user) {
    const accessToken = uuid.v4();

    user = new User({
      nickname: "测试用户",
      phoneNumber: xss(phoneNumber),
      verifyCode: verifyCode,
      accessToken: accessToken
    });
  } else {
    user.verifyCode = verifyCode;
  }
  try {
    user = await user.save();
    ctx.body = {
      success: true,
      data: user
    };
  } catch (e) {
    ctx.body = {
      success: false
    };

    return next;
  }
};

// 更新用户信息操作
const update = async (ctx, next) => {
  const body = ctx.request.body;
  let user = ctx.session.user;
  const fields = "gender,age,nickname,breed".split(",");

  fields.forEach(function(field) {
    if (body[field]) {
      user[field] = xss(body[field].trim());
    }
  });

  user = await user.save();

  ctx.body = {
    success: true,
    data: {
      nickname: user.nickname,
      accessToken: user.accessToken,
      age: user.age,
      breed: user.breed,
      gender: user.gender,
      _id: user._id
    }
  };
};

// 数据库接口测试

const users = async (ctx, next) => {
  const data = await userHelper.findAllUsers();
  // const obj = await userHelper.findByPhoneNumber({phoneNumber : '13525584568'})
  // console.log('obj=====================================>'+obj)

  ctx.body = {
    success: true,
    data
  };
};

const addUser = async (ctx, next) => {
  const user = new User({
    nickname: "测试用户",
    phoneNumber: xss("13800138000"),
    verifyCode: "5896",
    accessToken: uuid.v4()
  });
  const user2 = await userHelper.addUser(user);
  if (user2) {
    ctx.body = {
      success: true,
      data: user2
    };
  }
};

const deleteUser = async (ctx, next) => {
  const phoneNumber = xss(ctx.request.body.phoneNumber.trim());
  const data = await userHelper.deleteUser({ phoneNumber });
  ctx.body = {
    success: true,
    data
  };
};

export { signup, update, deleteUser, addUser, users };
