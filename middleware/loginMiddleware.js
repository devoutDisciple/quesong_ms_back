const resultMessage = require("../util/resultMessage");
const sequelize = require("../dataSource/MysqlPoolClass");
const account = require("../models/account");
const accountModel = account(sequelize);

function loginMiddleware(req, res, next) {
	console.log(req);
	let cookies = req.signedCookies;
	// 判断用户cookie是否正确
	if(cookies && cookies.userinfo) {
		let userinfo = cookies.userinfo, username = userinfo.split("_#$%^%$#_")[0], password = userinfo.split("_#$%^%$#_")[1];
		return accountModel.findOne({
			where: {
				username: username
			}
		}).then(user => {
			if(username == user.username && password == user.password) return next();
			return res.send(res.send(resultMessage.loginError("请重新登录!")));
		});
	}
	if(!cookies.userinfo && req.url != "/account/login") {
		return res.send(resultMessage.loginError("请重新登录!"));
	}
	next();
}

module.exports = loginMiddleware;
