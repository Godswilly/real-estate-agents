const { Agent } = require('../models/Agent');
const { Review } = require('../models/Review');

const addAgent = async (body) => {
	return await Agent.create(body);
};

const allAgents = async () => {
	return await Agent.findAll();
};

const singleAgent = async (params) => {
	const agentId = params;
	return await Agent.findByPk(agentId, {
		include: { model: Review, as: 'reviews' },
	});
};

module.exports = {
	addAgent,
	allAgents,
	singleAgent,
};
