const express = require('express');

const {
	createAgent,
	getAllAgents,
	getSingleAgent,
} = require('../controllers/agentsController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Agent:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - agentLicence
 *         - address
 *       properties:
 *         firstName:
 *           type: string
 *           description: Agent's first name
 *         lastName:
 *           type: string
 *           description: Agent's last name
 *         photoUrl:
 *           type: string
 *           description: Agent's photo URL
 *         agentLicence:
 *           type: string
 *           description: The agent's license number
 *         address:
 *           type: string
 *           description: The agent's address
 *         practiceAreas:
 *           type: string
 *           description: The agent's practice areas
 *         aboutMe:
 *           type: string
 *           description: Information about the agent
 *       example:
 *         firstName: 'Harry'
 *         lastName: 'Nick'
 *         photoUrl: 'https://i.picsum.photos/id/1/5616/3744.jpg?hmac=kKHwwU8s46oNettHKwJ24qOlIAsWN9d2TtsXDoCWWsQ'
 *         agentLicence: '1234567890'
 *         address: '908 Bel Air Rd, Los Angeles, CA 90077'
 *         practiceAreas: 'Los Angeles'
 *         aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
 */

/**
 * @swagger
 * tags:
 *   name: Agent
 *   description: Agent API
 */

/**
 * @swagger
 * /agents:
 *   get:
 *     summary: Get all agents
 *     tags: [Agent]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agent'
 *   post:
 *     summary: Create a new agent
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agent'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agent'
 *       400:
 *         description: Bad Request
 */
router.route('/').get(getAllAgents).post(createAgent);

/**
 * @swagger
 * /agents/{id}:
 *   get:
 *     summary: Get a single agent
 *     tags: [Agent]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               $ref: '#/components/schemas/Agent'
 *       404:
 *         description: Agent not found
 */
router.route('/:id').get(getSingleAgent);

module.exports = router;
