import request from 'supertest';
import express, { Express, Request, Response } from 'express';
import { requestValidator } from '../../src/validator';

describe('requestValidator', () => {
	let app: Express;
	const createTest = jest
		.fn()
		.mockImplementation((req: Request, res: Response) => {
			res.status(200).json({ result: 'success' });
		});

	beforeAll(() => {
		const testBodyValidator = requestValidator(
			{
				body: {
					type: 'object',
					additionalProperties: false,
					properties: {
						bodyProp: {
							type: 'number',
						},
					},
				},
			},
			true
		);

		const testQueryValidator = requestValidator(
			{
				query: {
					type: 'object',
					additionalProperties: false,
					properties: {
						queryProp: {
							type: 'boolean',
						},
					},
				},
			},
			true
		);

		const testParamsValidator = requestValidator(
			{
				params: {
					type: 'object',
					additionalProperties: false,
					properties: {
						paramsProp: {
							type: 'string',
							enum: ['valid', 'alsoValid'],
						},
					},
				},
			},
			true
		);

		const testAllValidator = requestValidator(
			{
				body: {
					type: 'object',
					additionalProperties: false,
					properties: {
						bodyProp: {
							type: 'number',
						},
					},
				},
				query: {
					type: 'object',
					additionalProperties: false,
					properties: {
						queryProp: {
							type: 'boolean',
						},
					},
				},
				params: {
					type: 'object',
					additionalProperties: false,
					properties: {
						paramsProp: {
							type: 'string',
							enum: ['valid', 'alsoValid'],
						},
					},
				},
			},
			true
		);

		app = express();
		app.use(express.json());
		app.post('/test/body', testBodyValidator, createTest);
		app.post('/test/query', testQueryValidator, createTest);
		app.post('/test/params/:paramsProp', testParamsValidator, createTest);
		app.post('/test/all/:paramsProp', testAllValidator, createTest);
	});

	it('should return 400 with an invalid body', (done) => {
		const expectedResponseBody = {
			ok: false,
			status: 400,
			error: [
				{
					keyword: 'type',
					dataPath: '/body/bodyProp',
					schemaPath: '#/properties/body/properties/bodyProp/type',
					params: {
						type: 'number',
					},
					message: 'should be number',
				},
			],
		};

		request(app)
			.post('/test/body')
			.send({ bodyProp: 'not a number' })
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(400)
			.end((err, res) => {
				if (err) return done(err);
				expect(res.body).toMatchObject(expectedResponseBody);
				done();
			});
	});

	it('should return 400 with an invalid query', (done) => {
		const expectedResponseBody = {
			ok: false,
			status: 400,
			error: [
				{
					keyword: 'type',
					dataPath: '/query/queryProp',
					schemaPath: '#/properties/query/properties/queryProp/type',
					params: {
						type: 'boolean',
					},
					message: 'should be boolean',
				},
			],
		};

		request(app)
			.post('/test/query?queryProp=notABoolean')
			.expect('Content-Type', /json/)
			.expect(400)
			.end((err, res) => {
				if (err) return done(err);
				expect(res.body).toMatchObject(expectedResponseBody);
				done();
			});
	});

	it('should return 400 with an invalid params', (done) => {
		const expectedResponseBody = {
			ok: false,
			status: 400,
			error: [
				{
					keyword: 'enum',
					dataPath: '/params/paramsProp',
					schemaPath: '#/properties/params/properties/paramsProp/enum',
					params: {
						allowedValues: ['valid', 'alsoValid'],
					},
					message: 'should be equal to one of the allowed values',
				},
			],
		};

		request(app)
			.post('/test/params/invalid')
			.expect('Content-Type', /json/)
			.expect(400)
			.end((err, res) => {
				if (err) return done(err);
				expect(res.body).toMatchObject(expectedResponseBody);
				done();
			});
	});

	it('should return pass validation with valid body, query, and params', (done) => {
		request(app)
			.post('/test/all/valid?queryProp=true')
			.send({ bodyProp: 3 })
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				expect(res.body).toMatchObject({ result: 'success' });
				expect(createTest).toHaveBeenCalledTimes(1);
				done();
			});
	});
});
