const Joi = require('joi');

const createAgentValidation = (body) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label('First Name'),
		lastName: Joi.string().required().label('Last Name'),
		photoUrl: Joi.string().label('Photo Url'),
		agentLicence: Joi.string().required().label('Agent Licence'),
		address: Joi.string().required().label('Address'),
		practiceAreas: Joi.string().label('Practice Areas'),
		aboutMe: Joi.string().label('About Me'),
	});
	return schema.validate(body);
};

module.exports = {
	createAgentValidation,
};
