const resultMessage = require("../util/resultMessage");
const request = require("request");
// const Sequelize = require("sequelize");
// const Op = Sequelize.Op;
const sequelize = require("../dataSource/MysqlPoolClass");
const user = require("../models/user");
const UserModel = user(sequelize);

module.exports = {
	// 用户登录
	register: (req, res) => {
		try {
			console.log(req.query);
			let query = req.query;
			let appid = query.appid, AppSecret = query.AppSecret, code = query.code, avatarUrl = query.avatarUrl, name = query.name;
			request
				.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`,
					function(error, response, body) {
						let data = JSON.parse(body), openid = data.openid;
						UserModel.findOne({
							where: {
								openid: openid
							}
						}).then(async (user) => {
							if(!user) {
								await UserModel.create({
									openid: openid,
									name: name,
									avatarUrl: avatarUrl,
								}).then(data => {
									console.log(data);
									res.send(resultMessage.success({
										data: openid
									}));
								});
								// return res.send(resultMessage.success([]));
							}else{
								return res.send(resultMessage.success({
									data: openid
								}));
							}
						});
					});
		} catch (error) {
			console.log(error);
			return res.send(resultMessage.error([]));
		}
	},
	// 用户补充收货地址
	addAddress: async (req, res) => {
		try {
			let body = req.body, params = {
				openid: body.openid,
			};
			let user = await UserModel.findOne({
				where: {
					openid: params.openid
				},
			});
			console.log(user);
			let originAddress = user.address;
			let newAddress = JSON.parse(body.address);
			// 如果已有地址
			if(originAddress) {
				originAddress = JSON.parse(originAddress);
				originAddress.map(item => {
					item.default = false;
				});
				newAddress.default = true;
				originAddress.push(newAddress);
			} else {
				// 没有地址
				params = Object.assign(body, params);
				newAddress.default = true;
				originAddress = [newAddress];
			}
			params.address = JSON.stringify(originAddress);
			await UserModel.update(params, {
				where: {
					openid: params.openid,
				},
			});
			res.send(resultMessage.success([]));
		} catch (error) {
			console.log(error);
			return res.send(resultMessage.error([]));
		}
	},
	// 通过openid获取用户信息
	getUserByOpenid: async (req, res) => {
		try {
			let user = await UserModel.findOne({
				where: {
					openid: req.query.openid
				},
			});
			res.send(resultMessage.success(user));
		} catch (error) {
			console.log(error);
			return res.send(resultMessage.error([]));
		}
	},
	// 更改收货地址
	updateAddress: async (req, res) => {
		try {
			let openid = req.body.openid;

			await UserModel.update({
				address: req.body.address
			}, {
				where: {
					openid: openid,
				},
			});
			res.send(resultMessage.success([]));
		} catch (error) {
			console.log(error);
			return res.send(resultMessage.error([]));
		}
	},
};
