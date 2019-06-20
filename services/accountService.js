const resultMessage = require("../util/resultMessage");
// const sequelize = require("../dataSource/MysqlPoolClass");
// const account = require("../models/account");
// const accountModel = account(sequelize);

module.exports = {
	// 根据商店id获取评价
	getLogin: async (req, res) => {
		// let shopid = req.query.shopid;
		try {
			// 增加评价
			// let evaluates = await evaluateModel.findAll({
			// 	where: {
			// 		shopid: shopid
			// 	},
			// 	order: [
			// 		// will return `name`  DESC 降序  ASC 升序
			// 		["create_time", "DESC"],
			// 	]
			// });
			// let result = [];
			// evaluates.map(item => {
			// 	result.push(item.dataValues);
			// });
			res.send(resultMessage.success([]));
		} catch (error) {
			console.log(error);
			return res.send(resultMessage.error([]));
		}
	},

};
