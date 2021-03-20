import request from 'supertest';
import { Express } from 'express';
import { createApp } from '../../../src/app';

describe('spellRouter', () => {
	let app: Express;

	beforeAll(() => (app = createApp()));

	describe('GET /', () => {
		it('should return 200 and return user endpoint welcome message', (done) => {
			request(app)
				.get('/api/user')
				.expect('Content-Type', /text\/html/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.text).toBe(
						'You have reached the users endpoint of the API'
					);
					done();
				});
		});
	});
});
