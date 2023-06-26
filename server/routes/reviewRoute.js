const express = require('express');
const {
  createReview,
  getReviews,
} = require('../controllers/reviewsController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - rating
 *         - comment
 *       properties:
 *         rating:
 *           type: number
 *           description: Rating given to the agent (between 1 and 5)
 *         comment:
 *           type: string
 *           description: Comment about the agent
 *       example:
 *         rating: 4.5
 *         comment: "Great agent, highly recommended"
 */

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: Review API
 */

/**
 * @swagger
 * /agents/{agentId}/reviews:
 *   post:
 *     summary: Create a new review for an agent
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: agentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the agent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Bad Request
 */
router.route('/:agentId/reviews').post(createReview);

/**
 * @swagger
 * /agents/{agentId}/reviews:
 *   get:
 *     summary: Get all reviews for an agent
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: agentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the agent
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.route('/:agentId/reviews').get(getReviews);

module.exports = router;
