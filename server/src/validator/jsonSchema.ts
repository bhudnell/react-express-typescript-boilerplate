export type JsonSchemaType =
	| 'boolean'
	| 'number'
	| 'string'
	| 'object'
	| 'array'
	| 'null';

export type JsonPrimitiveValue = string | number | boolean | null;

export interface JsonSchemaProperties {
	[key: string]: JsonSchema;
}

export interface JsonSchema {
	type?: JsonSchemaType | JsonSchemaType[];
	required?: string[];
	properties?: JsonSchemaProperties;
	additionalProperties?: boolean | JsonSchemaProperties;
	enum?: JsonPrimitiveValue[];
}
