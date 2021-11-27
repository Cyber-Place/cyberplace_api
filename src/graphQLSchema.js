import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	AuthMutations,
	ValidationQueries,
    authTypeDef
} from './auth/typeDefs';

/* import {
	addressMutations,
	addressQueries,
    addressTypeDef
} from './address/typeDefs'; */

import authResolvers from './auth/resolvers';
/*import addressResolvers from './address/resolvers';*/

// merge the auth typeDefs 
const mergedAuthTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		authTypeDef
	],
	[
		ValidationQueries
	],
	[
		AuthMutations
	]
);

// merge the address typeDefs 
/*const mergedAddressTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		addressTypeDef
	],
	[
		addressMutations
	],
	[
		addressQueries
	]
);*/


// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedAuthTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		authResolvers
	)
});

/*export default makeExecutableSchema({
	typeDefs: mergedAddressTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		addressResolvers
	)
});*/
