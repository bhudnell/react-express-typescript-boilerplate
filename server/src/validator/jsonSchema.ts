export type JsonPrimitiveValue = string | number | boolean | null;

export type JsonValue = JsonPrimitiveValue | JsonObject | JsonArray;

export interface JsonObject {
	[key: string]: JsonValue;
}

export type JsonArray = Array<JsonValue>;

export type JsonSchemaType =
	| 'boolean'
	| 'number'
	| 'string'
	| 'object'
	| 'array'
	| 'null';

export interface JsonSchemaProperties {
	[key: string]: JsonSchema;
}

export interface JsonSchema {
	// metadata
	$comment?: string;
	title?: string;
	description?: string;
	examples?: JsonArray;
	default?: JsonValue;
	const?: JsonValue;

	// type constraint
	type?: JsonSchemaType | JsonSchemaType[];
	$id?: string;
	$ref?: string;
	$schema?: string;
	contentEncoding?: string;
	contentMediaType?: string;
	[keyword: string]: any;
	defs?: JsonSchemaProperties;
	definitions?: JsonSchemaProperties;

	// number constraints
	minimum?: number;
	maximum?: number;
	exclusiveMinimum?: number;
	exclusiveMaximum?: number;
	multipleOf?: number;

	// string constraints
	minLength?: number;
	maxLength?: number;
	pattern?: string;
	format?:
		| 'date-time'
		| 'date'
		| 'time'
		| 'duration'
		| 'email'
		| 'hostname'
		| 'ipv4'
		| 'ipv6'
		| 'uri'
		| 'url'
		| 'uri-reference'
		| 'url-template'
		| 'json-pointer'
		| 'relative-json-pointer'
		| 'uuid'
		| 'regex';
	enum?: JsonPrimitiveValue[];

	// object constraints
	required?: string[];
	properties?: JsonSchemaProperties;
	additionalProperties?: boolean | JsonSchemaProperties;
	unevaluatedProperties?: boolean | JsonSchemaProperties;
	patternProperties?: JsonSchemaProperties;
	minProperties?: number;
	maxProperties?: number;
	dependencies?: string[];
	dependentRequired?: string[];
	dependentSchemas?: JsonSchemaProperties;
	propertyNames?: JsonSchemaProperties;

	// array constraints
	items?: JsonSchema | JsonSchema[];
	minItems?: number;
	maxItems?: number;
	uniqueItems?: boolean;
	contains?: JsonSchema;
	minContains?: number;
	maxContains?: number;
	additionalItems?: boolean | { [key: string]: JsonSchema };

	//combination constraints
	allOf?: JsonSchema[];
	anyOf?: JsonSchema[];
	oneOf?: JsonSchema[];

	// condition constraints
	if?: JsonSchemaProperties;
	then?: JsonSchemaProperties;
	else?: JsonSchemaProperties;
	not?: JsonSchemaProperties;
}
