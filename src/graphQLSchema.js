import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';



//Importar los motations, queries, typesdef y resolvers de cada ms
import {
	authMutations,
	authQueries,
	authTypeDef
} from './gateway/account/auth/typeDefs';

import authResolvers from './gateway/account/auth/resolvers';



// merge the auth typeDefs 
const mergedAuthTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		authTypeDef
	],
	[
		authQueries
	],
	[
		authMutations
	]
);




// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedAuthTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		authResolvers
	)
});

