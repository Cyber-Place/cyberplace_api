import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';



//Importar los mUtations, queries, typesdef y resolvers de cada ms

// Auth:
import {
	authMutations,
	authQueries,
	authTypeDef
} from './gateway/account/auth/typeDefs';

import authResolvers from './gateway/account/auth/resolvers';

// Address:
import {
	addressMutations,
	addressQueries,
	addressTypeDef
} from './gateway/account/address/typeDefs';

import addressResolvers from './gateway/account/address/resolvers';



// merge the auth typeDefs 

//Auth:
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		authTypeDef, 
		addressTypeDef
	],
	[
		authQueries, 
		addressQueries
	],
	[
		authMutations, 
		addressMutations
	]
);


// Generate the schema object from your types definition.

export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge({ JSON: GraphQLJSON }, authResolvers, addressResolvers),
});
