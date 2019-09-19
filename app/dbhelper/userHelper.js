
// import mongoose from 'mongoose';
// var User = mongoose.model('User')
import User from '../models/user';

 // 通过电话号码查询                   
const findByPhoneNumber = async ({phoneNumber}) => {
	const query = User.find({phoneNumber})
	const res = null
	await query.exec(function(err, user) {
		if(err) {
			res = {}
		}else {
			res = user
		}
	})
	// console.log('res====>' + res)
	return res;
}

// 查找所用用户
const findAllUsers = async () => {
	const query = User.find({});
	let res = []
	await query.exec(function(err, users) {
		if(err) {
			res = []
		}else {
			res = users;
		}
	})
	return res
}

// 增加用户 user mongoose.model('User')
const addUser = async (user) => {
	user = await user.save()
	return user
}

// 删除用户
const deleteUser = async ({phoneNumber}) => {
	let flag = false
	console.log('flag==========>'+flag)
	await User.remove({phoneNumber}, function(err) {
		if(err) {
			flag = false
			// return false
		}else{
			flag = true
		}
		
	})
	console.log('flag=====await=====>'+flag)
	return flag
}

export { findByPhoneNumber, findAllUsers, addUser, deleteUser }
