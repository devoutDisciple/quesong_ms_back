const express = require("express");
const app = express();
const logger = require("morgan");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const sessionParser = require("express-session");
const bodyParser = require("body-parser");
const controller = require("./controller/index");
const path = require("path");
const loginMiddleware = require("./middleware/loginMiddleware");
const config = require("./config/AppConfig");


// 解析cookie和session还有body
app.use(cookieParser(config.cookieSign)); // 挂载中间件，可以理解为实例化
app.use(sessionParser({
	"secret": "ruidoc",     // 签名，与上文中cookie设置的签名字符串一致，
	"cookie": {
		"maxAge": 90000
	},
	"name": "session_id"    // 在浏览器中生成cookie的名称key，默认是connect.sid
}));
app.use(express.static(path.join(__dirname, "./public")));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// 打印日志
app.use(logger(":method :url :status :res[content-length] - :response-time ms"));

app.all("*", (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", "3.2.1");
	next();
});

// 判断用户是否登录
app.use(loginMiddleware);

// 路由 controller层
controller(app);

// // 监听3001端口
app.listen(3001, () => {
	console.log(chalk.yellow("server is listenning 3001"));
});
