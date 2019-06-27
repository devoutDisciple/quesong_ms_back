const resultMessage = require("../util/resultMessage");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const sequelize = require("../dataSource/MysqlPoolClass");
const campus = require("../models/campus");
const CampusModel = campus(sequelize);

module.exports = {
	// 获取所有位置信息
	getAll: async (req, res) => {
		try {
			let type = await CampusModel.findAll({
				where: {
					is_delete: {
						[Op.not]: ["2"]
					},
				},
				order: [
					// will return `name`  DESC 降序  ASC 升序
					["sort", "DESC"],
				]
			});
			let result = [];
			type.map(item => {
				result.push(item.dataValues);
			});
			res.send(resultMessage.success(result));
		} catch (error) {
			console.log(error);
			return res.send(resultMessage.error([]));
		}
	},
	// 增加位置信息
	add: async (req, res) => {
		try {
			let body = req.body;
			await CampusModel.create({
				name: body.name,
				floor: JSON.stringify(body.floor),
				sort: body.sort
			});
			res.send(resultMessage.success("success"));
		} catch (error) {
			console.log(error);
			return res.send(resultMessage.error([]));
		}
	},
	// 删除位置信息
	delete: async (req, res) => {
		try {
			await CampusModel.destroy({
				where: {
					id: req.body.id
				}
			});
			res.send(resultMessage.success("success"));
		} catch (error) {
			console.log(error);
			return res.send(resultMessage.error([]));
		}
	},
	// 修改位置信息
	update: async (req, res) => {
		try {
			let body = req.body;
			await CampusModel.update({
				name: body.name,
				floor: JSON.stringify(body.floor),
				sort: body.sort
			}, {
				where: {
					id: body.id
				},
			});
			res.send(resultMessage.success("success"));
		} catch (error) {
			console.log(error);
			return res.send(resultMessage.error([]));
		}
	},
};
