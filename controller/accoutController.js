const express = require("express");
const router = express.Router();
const accountService = require("../services/accountService");

// 根据商店id获取评价
router.post("/login", (req, res) => {
	accountService.login(req, res);
});

module.exports = router;
