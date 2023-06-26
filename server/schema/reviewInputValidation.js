const Joi = require('joi');

const createReviewValidation = (body) => {
	const schema = Joi.object({
		rating: Joi.number().integer().required().label('Rating'),
		comment: Joi.string().required().label('Comment'),
	});
	return schema.validate(body);
};

module.exports = {
	createReviewValidation,
};
