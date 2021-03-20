import { Express } from 'express';
import request from 'supertest';
import { createApp } from '../../src/app';

let app: Express;

beforeAll(async () => {
	app = createApp();
});

describe('app', () => {
	describe('GET /api', () => {
		it('should return 200 and a welcome to the API message', (done) => {
			request(app)
				.get('/api')
				.expect('Content-Type', /text\/html/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.text).toBe('You have reached the API');
					done();
				});
		});

		it('should return 404 for api endpoints that dont exist', (done) => {
			request(app).get('/api/does-not-exist').expect(404, done);
		});
	});
});
