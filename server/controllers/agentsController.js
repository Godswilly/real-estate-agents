const asyncHandler = require('../utils/asyncHandle');
const ErrorHandler = require('../utils/errorHandler');
const { createAgentValidation } = require('../schema/agentInputValidation');
const {
	addAgent,
	allAgents,
	singleAgent,
} = require('../services/agentService');

const createAgent = asyncHandler(async (req, res, next) => {
	const { error } = createAgentValidation(req.body);

	if (error) {
		throw new ErrorHandler(`${error.details[0].message}`);
	}

	const newAgent = await addAgent(req.body);

	res.status(201).json({
		status: 'Agent created',
		data: {
			agent: newAgent,
		},
	});
});

const getAllAgents = asyncHandler(async (req, res, next) => {
	const agents = await allAgents();

	res.status(200).json(agents);
});

const getSingleAgent = asyncHandler(async (req, res, next) => {
	const id = req.params.id;
	const agent = await singleAgent(id);

	if (!agent) {
		throw new ErrorHandler('No agent found with the given ID', 404);
	}

	console.log(res.body);

	res.status(200).json(agent);
});

module.exports = {
	createAgent,
	getAllAgents,
	getSingleAgent,
};
