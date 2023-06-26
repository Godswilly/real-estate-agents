const Sequelize = require('sequelize');

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './database.sqlite3',
});

class Review extends Sequelize.Model {}
Review.init(
	{
		// attributes
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		agentId: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		rating: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		comment: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'Review',
		// options
	}
);

module.exports = {
	sequelize,
	Review,
};
