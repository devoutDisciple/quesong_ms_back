function loginMiddleware(req, res, next) {
	console.log(req);
	let cookies = req.signedCookies;
	console.log(cookies);
	if(cookies && cookies.userinfo) {
		console.log(cookies.userinfo);
		// res.redirect("/swiper/all");
		res.send({
			status: 302,
			data: "hello"
		});
	} else {
		res.cookie("userinfo","753",{maxAge:600000,signed:true});  //signed 表示对cookie加密
		res.send({
			status: 302,
			data: "world"
		});
	}
	// next();
}

module.exports = loginMiddleware;
