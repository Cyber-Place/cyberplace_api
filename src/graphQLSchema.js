import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';


import { mergeSchemas } from './utilities';


//ACCOUNT_MS
//Importar los mUtations, queries, typesdef y resolvers de cada ms

// Auth:
import {
	authMutations,
	authQueries,
	authTypeDef
} from './gateway/account/auth/typeDefs';

import authResolvers from './gateway/account/auth/resolvers';

// Products:
import {
	productMutations,
	productQueries,
	productTypeDef
} from './gateway/products/typeDefs';

import productResolvers from './gateway/products/resolvers';

// Address:
import {
	addressMutations,
	addressQueries,
	addressTypeDef
} from './gateway/account/address/typeDefs';

import addressResolvers from './gateway/account/address/resolvers';


//SEARCH_HISTORY_MS

//Importar los mUtations, queries, typesdef y resolvers de cada ms

import {
	historyMutations,
	historyQueries,
	historyTypeDef
} from './gateway/searchhistory/typeDefs';

import historyResolvers from './gateway/searchhistory/resolvers';

//product_rating_MS

//Importar los mUtations, queries, typesdef y resolvers de cada ms

import {
	ratingMutations,
	ratingQueries,
	ratingTypeDef
} from './gateway/product_rating/typeDefs';

import ratingResolvers from './gateway/product_rating/resolvers';


//PRODUCT_PURCHASE_MS

//Importar los mUtations, queries, typesdef y resolvers de cada ms

import {
	purchaseMutations,
	purchaseQueries,
	purchaseTypeDef
} from './gateway/product_purchase/typeDefs';

import purchaseResolvers from './gateway/product_purchase/resolvers';

import{
  orderTypeDef,
  orderQueries,
  orderMutations

} from './gateway/order/typeDefs';

import orderResolvers from './gateway/order/resolvers';


// merge the auth typeDefs 

//Auth:
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		authTypeDef, 
		addressTypeDef,
		historyTypeDef,
		purchaseTypeDef,
    orderTypeDef,
		productTypeDef,
		ratingTypeDef,
	],
	[
		authQueries, 
		addressQueries,
		historyQueries,
		purchaseQueries,
    orderQueries,
		productQueries,
		ratingQueries,
	],
	[
		authMutations, 
		addressMutations,
		historyMutations,
		purchaseMutations,
    orderMutations,
		productMutations,
		ratingMutations,
	]
);


// Generate the schema object from your types definition.

export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge({ JSON: GraphQLJSON }, 
		authResolvers,
		addressResolvers,
		historyResolvers,
		purchaseResolvers,
    orderResolvers,
		productResolvers,
		ratingResolvers,
	),
});
