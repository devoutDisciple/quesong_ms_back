const Sequelize = require("sequelize");
module.exports = function(sequelize) {
	return sequelize.define("campus", {
		id: {
			type: Sequelize.INTEGER(11),
			allowNull: true,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING(45),
			allowNull: true,
			defaultValue: "学校名称"
		},
		floor: {
			type: Sequelize.STRING(8000),
			allowNull: true,
			defaultValue: "[]"
		},
		sort: {
			type: Sequelize.INTEGER(11),
			allowNull: true,
			defaultValue: 1
		},
		is_delete: {
			type: Sequelize.INTEGER(11),
			allowNull: true,
			defaultValue: "1"
		}
	}, {
		tableName: "campus",
		timestamps: false
	});
};
