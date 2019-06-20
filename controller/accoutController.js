const express = require("express");
const router = express.Router();
const accountService = require("../services/accountService");

// 根据商店id获取评价
router.get("/login", (req, res) => {
	accountService.getLogin(req, res);
});

module.exports = router;
