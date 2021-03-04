import { NextFunction, Request, RequestHandler, Response } from 'express';
import AJV from 'ajv';
import addFormats from 'ajv-formats';
import { JsonSchema } from './jsonSchema';

export interface RequestSchema {
	body?: JsonSchema;
	query?: JsonSchema;
	params?: JsonSchema;
}

export function requestValidator(
	requestSchema: RequestSchema,
	coerceTypes?: boolean | 'array'
): RequestHandler {
	const jsonSchema: any = {
		type: 'object',
		required: [],
		properties: {},
	};

	if (requestSchema.body) {
		jsonSchema.required.push('body');
		jsonSchema.properties.body = requestSchema.body;
	}

	if (requestSchema.query) {
		jsonSchema.required.push('query');
		jsonSchema.properties.query = requestSchema.query;
	}

	if (requestSchema.params) {
		jsonSchema.required.push('params');
		jsonSchema.properties.params = requestSchema.params;
	}

	const ajv = new AJV({ coerceTypes });
	addFormats(ajv);
	const validate = ajv.compile(jsonSchema);

	return async function (
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<any> {
		const validationResult = validate(request);
		if (validationResult) {
			return next();
		}

		const validationErrors = validate.errors!;
		const responseBody = {
			ok: false,
			status: 400,
			error: validationErrors,
		};

		response.status(responseBody.status).json(responseBody);
	};
}
