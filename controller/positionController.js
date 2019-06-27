const express = require("express");
const router = express.Router();
const positionService = require("../services/positionService");

// 获取所有位置
router.get("/all", (req, res) => {
	positionService.getAll(req, res);
});

// 增加校区
router.post("/add", (req, res) => {
	positionService.add(req, res);
});

// 删除校区
router.post("/delete", (req, res) => {
	positionService.delete(req, res);
});

// 编辑校区
router.post("/update", (req, res) => {
	positionService.update(req, res);
});

module.exports = router;
