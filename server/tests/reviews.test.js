const request = require('supertest');
const app = require('../app');

describe('REVIEW API', () => {
	const data = {
		rating: 4,
		comment: 'I am here',
	};

	const data2 = {
		rating: 'Coming home',
		comment: 'I am here now',
	};

	describe('CREATE A REVIEW FOR A SPECIFIC AGENT', () => {
		it('should create a new review for a specific agent', async () => {
			const agentId = 3;
			const res = await request(app)
				.post(`/agents/${agentId}/reviews`)
				.send(data);
			expect(res.statusCode).toEqual(201);
			expect(res.body.status).toEqual('Review created');
			expect(res.body.data.review).toHaveProperty('id');
			expect(res.body.data.review).toHaveProperty('rating');
			expect(res.body.data.review).toHaveProperty('comment');
		});

		it('should return a 500 status if there is a validation error', async () => {
			const res = await request(app)
				.post('/agents/:agentId/reviews')
				.send(data2);
			expect(res.statusCode).toEqual(500);
			expect(res.body).toHaveProperty('error');
			expect(res.body.status).toEqual('error');
		});
	});

	describe('GET ALL REVIEWS OF AN AGENT', () => {
		it('should return 200 OK if reviews exist for an agent', async () => {
			const agentId = 1;
			const res = await request(app).get(`/agents/${agentId}/reviews`);
			expect(res.statusCode).toBe(200);
			expect(typeof res).toEqual('object');
			expect(res.body[0]).toHaveProperty('rating');
      expect(res.body[0]).toHaveProperty('comment');
		});

		it('should return 404 if agentId does not exist', async () => {
			const agentId = 100;
			const res = await request(app).get(`/agents/${agentId}/reviews`);
			expect(res.statusCode).toBe(404);
			expect(res.body.error.statusCode).toBe(404);
			expect(res.body.error.status).toBe('fail');
			expect(res.body.message).toBe('No agent found with the given ID');
		});
	});
});

