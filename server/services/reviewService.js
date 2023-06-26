const { Agent } = require('../models/Agent');
const { Review } = require('../models/Review');

const addReview = async (agentId, reviewData) => {
	const agent = await Agent.findByPk(agentId);

	if (!agent) {
		throw new Error('Agent not found');
	}

	const review = await Review.create({
		agentId,
		...reviewData,
	});

	return review;
};

module.exports = {
	addReview,
};
