function loginMiddleware(req, res, next) {
	console.log(req);
	console.log(req.cookies);
	console.log(req.headers.cookie);
	console.log(req.signedCookies);
	res.cookie("userinfo","123",{maxAge:600000,signed:true});  //signed 表示对cookie加密
	next();
}

module.exports = loginMiddleware;
