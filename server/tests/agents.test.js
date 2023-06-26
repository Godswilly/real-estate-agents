const request = require('supertest');
const app = require('../app');
const { Agent } = require('../models/Agent');

describe('AGENT API', () => {
	const data = {
		firstName: 'Kalu',
		lastName: 'Huot',
		photoUrl:
			'https://i.picsum.photos/id/1/5616/3744.jpg?hmac=kKHwwU8s46oNettHKwJ24qOlIAsWN9d2TtsXDoCWWsQ',
		agentLicence: '1234567890',
		address: '908 Bel Air Rd, Los Angeles, CA 90077',
		practiceAreas: ['Los Angeles', 'San Diego', 'New York', 'Miami'].join(','),
		aboutMe:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum vitae sapien pellentesque habitant morbi tristique. Dui accumsan sit amet nulla facilisi morbi tempus. Fringilla urna porttitor rhoncus dolor purus non. Vitae et leo duis ut diam quam. Eget nunc scelerisque viverra mauris. Sed velit dignissim sodales ut eu. Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis. Pellentesque adipiscing commodo elit at imperdiet dui accumsan. Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Nunc non blandit massa enim. Risus nec feugiat in fermentum posuere urna nec tincidunt praesent.',
	};

	const data2 = {
		firstName: 'Matthew',
		lastName: '',
		photoUrl:
			'https://i.picsum.photos/id/1005/5760/3840.jpg?hmac=2acSJCOwz9q_dKtDZdSB-OIK1HUcwBeXco_RMMTUgfY',
		agentLicence: '0987654321',
		address: '308 Vista De La Playa, La Jolla, CA 92037',
		practiceAreas: ['San Diego'].join(','),
		aboutMe:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum vitae sapien pellentesque habitant morbi tristique. Dui accumsan sit amet nulla facilisi morbi tempus. Fringilla urna porttitor rhoncus dolor purus non. Vitae et leo duis ut diam quam. Eget nunc scelerisque viverra mauris. Sed velit dignissim sodales ut eu. Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis. Pellentesque adipiscing commodo elit at imperdiet dui accumsan. Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Nunc non blandit massa enim. Risus nec feugiat in fermentum posuere urna nec tincidunt praesent.',
	};

	beforeEach(async () => {
		await Agent.destroy({ where: { firstName: 'Kalu' } });
		await Agent.create(data);
	});

	afterEach(async () => {
		await Agent.destroy({ where: { firstName: 'Kalu' } });
	});

	describe('GET ALL AGENTS', () => {
		it('should return 200 OK if agents exist', async () => {
			const res = await request(app).get('/agents');
			expect(res.statusCode).toBe(200);
		});

		it('Should return the Data Agent', async () => {
			const res = await request(app).get('/agents');
			expect(res.statusCode).toEqual(200);
			expect(Array.isArray(res.body)).toBe(true);

			const dataAgent = [
				{
					id: 1,
					firstName: 'Anton',
					lastName: 'Huot',
					photoUrl:
						'https://fastly.picsum.photos/id/1/5616/3744.jpg?hmac=kKHwwU8s46oNettHKwJ24qOlIAsWN9d2TtsXDoCWWsQ',
					agentLicence: '1234567890',
					address: '908 Bel Air Rd, Los Angeles, CA 90077',
					practiceAreas: 'Los Angeles,San Diego,New York,Miami',
					aboutMe:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum vitae sapien pellentesque habitant morbi tristique. Dui accumsan sit amet nulla facilisi morbi tempus. Fringilla urna porttitor rhoncus dolor purus non. Vitae et leo duis ut diam quam. Eget nunc scelerisque viverra mauris. Sed velit dignissim sodales ut eu. Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis. Pellentesque adipiscing commodo elit at imperdiet dui accumsan. Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Nunc non blandit massa enim. Risus nec feugiat in fermentum posuere urna nec tincidunt praesent.',
					createdAt: '2023-06-24T15:30:59.707Z',
					updatedAt: '2023-06-24T15:30:59.707Z',
				},
				{
					id: 2,
					firstName: 'Matthew',
					lastName: 'Wiebe',
					photoUrl:
						'https://fastly.picsum.photos/id/1005/5760/3840.jpg?hmac=2acSJCOwz9q_dKtDZdSB-OIK1HUcwBeXco_RMMTUgfY',
					agentLicence: '0987654321',
					address: '308 Vista De La Playa, La Jolla, CA 92037',
					practiceAreas: 'San Diego',
					aboutMe:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum vitae sapien pellentesque habitant morbi tristique. Dui accumsan sit amet nulla facilisi morbi tempus. Fringilla urna porttitor rhoncus dolor purus non. Vitae et leo duis ut diam quam. Eget nunc scelerisque viverra mauris. Sed velit dignissim sodales ut eu. Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis. Pellentesque adipiscing commodo elit at imperdiet dui accumsan. Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Nunc non blandit massa enim. Risus nec feugiat in fermentum posuere urna nec tincidunt praesent.',
					createdAt: '2023-06-24T15:30:59.708Z',
					updatedAt: '2023-06-24T15:30:59.708Z',
				},
				{
					id: 3,
					firstName: 'Cayton',
					lastName: 'Heath',
					photoUrl:
						'https://fastly.picsum.photos/id/1011/5472/3648.jpg?hmac=Koo9845x2akkVzVFX3xxAc9BCkeGYA9VRVfLE4f0Zzk',
					agentLicence: '1234098756',
					address: '6800 Fisher Is Unit 6802 PH-2, Miami Beach, FL 33109',
					practiceAreas: 'Miami,New York',
					aboutMe:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum vitae sapien pellentesque habitant morbi tristique. Dui accumsan sit amet nulla facilisi morbi tempus. Fringilla urna porttitor rhoncus dolor purus non. Vitae et leo duis ut diam quam. Eget nunc scelerisque viverra mauris. Sed velit dignissim sodales ut eu. Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis. Pellentesque adipiscing commodo elit at imperdiet dui accumsan. Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Nunc non blandit massa enim. Risus nec feugiat in fermentum posuere urna nec tincidunt praesent.',
					createdAt: '2023-06-24T15:30:59.708Z',
					updatedAt: '2023-06-24T15:30:59.708Z',
				},
				{
					id: 4,
					firstName: 'Jordan',
					lastName: 'McQueen',
					photoUrl:
						'https://fastly.picsum.photos/id/349/3264/2176.jpg?hmac=WNt0QoaZyFRaiL5yitDV4LOXzdHV5Z9tHUxbc6KdBSY',
					agentLicence: '123321890',
					address: '53 W 53rd St, New York, NY 10019, United States',
					practiceAreas: 'New York',
					aboutMe:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum vitae sapien pellentesque habitant morbi tristique. Dui accumsan sit amet nulla facilisi morbi tempus. Fringilla urna porttitor rhoncus dolor purus non. Vitae et leo duis ut diam quam. Eget nunc scelerisque viverra mauris. Sed velit dignissim sodales ut eu. Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis. Pellentesque adipiscing commodo elit at imperdiet dui accumsan. Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Nunc non blandit massa enim. Risus nec feugiat in fermentum posuere urna nec tincidunt praesent.',
					createdAt: '2023-06-24T15:30:59.709Z',
					updatedAt: '2023-06-24T15:30:59.709Z',
				},
				{
					id: 5,
					firstName: 'Kalu',
					lastName: 'Agu Kalu',
					photoUrl:
						'https://fastly.picsum.photos/id/201/5000/3333.jpg?hmac=NE8fOMa8u9PBfkq4AVwEoJdRqoPTNwUsyKvKWuXyNCk',
					agentLicence: '2468105555',
					address: '24 Assemblies Avenue Ogbor-hill Aba Abia State Nigeria',
					practiceAreas: 'Enugu, Aba',
					aboutMe: 'I am an excellent agent with great values.',
					createdAt: '2023-06-24T15:42:17.742Z',
					updatedAt: '2023-06-24T15:42:17.742Z',
				},
			];
			for (const item of dataAgent) {
				expect(item).toHaveProperty('firstName');
			}
		});
	});

	describe('CREATE AGENT ', () => {
		it('should create a new agent', async () => {
			const res = await request(app).post(`/agents`).send(data);
			expect(res.statusCode).toEqual(201);
			expect(res.body.status).toEqual('Agent created');
			expect(res.body.data.agent).toHaveProperty('id');
			expect(res.body.data.agent).toHaveProperty('firstName');
		});

		it('should return a 500 status if there is validation error', async () => {
			const res = await request(app).post('/agents').send(data2);
			expect(res.statusCode).toEqual(500);
			expect(res.body).toHaveProperty('error');
			expect(res.body.status).toEqual('error');
		});
	});

	describe('GET A SINGLE AGENT ', () => {
		it('should return a single agent', async () => {
			const agentId = 3;
			const res = await request(app).get(`/agents/${agentId}`).send(data);
			expect(res.statusCode).toEqual(200);
			expect(typeof res).toEqual('object');
			expect(res.body).toHaveProperty('id', agentId);
		});

		it('should return 404 if agentId does not exist', async () => {
			const agentId = 30;
			const res = await request(app).get(`/agents/${agentId}`);

			expect(res.statusCode).toBe(404);
			expect(res.body.error.statusCode).toBe(404);
			expect(res.body.error.status).toBe('fail');
			expect(res.body.message).toBe('No agent found with the given ID');
		});
	});
});
