const asyncHandler = require('../utils/asyncHandle');
const ErrorHandler = require('../utils/errorHandler');
const { createReviewValidation } = require('../schema/reviewInputValidation');
const { addReview } = require('../services/reviewService.js');
const { Review } = require('../models/Review');
const { Agent } = require('../models/Agent');

const createReview = asyncHandler(async (req, res, next) => {
  const { error } = createReviewValidation(req.body);

  if (error) {
    throw new ErrorHandler(`${error.details[0].message}`);
  }
  const agentId = req.params.agentId;

  if (!agentId) {
    throw new ErrorHandler('No agent found with the given ID', 404);
  }
  const reviewData = req.body;

  const review = await addReview(agentId, reviewData);

  res.status(201).json({
    status: 'Review created',
    data: {
      review: review,
    },
  });
});

const getReviews = async (req, res, next) => {
  try {
    const agentId = req.params.agentId;
    const agent = await Agent.findByPk(agentId);
    if (!agent) {
      throw new ErrorHandler('No agent found with the given ID', 404);
    }

    const reviews = await Review.findAll({
      where: { agentId: agent.id },
      order: [['id', 'DESC']],
    });

    return res.json(reviews);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReview,
  getReviews,
};
