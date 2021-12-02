'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var KoaRouter = _interopDefault(require('koa-router'));
var koaLogger = _interopDefault(require('koa-logger'));
var koaBody = _interopDefault(require('koa-bodyparser'));
var koaCors = _interopDefault(require('@koa/cors'));
var apolloServerKoa = require('apollo-server-koa');
var merge = _interopDefault(require('lodash.merge'));
var GraphQLJSON = _interopDefault(require('graphql-type-json'));
var graphqlTools = require('graphql-tools');
var request = _interopDefault(require('request-promise-native'));
var graphql = require('graphql');
var koaPlayground = _interopDefault(require('graphql-playground-middleware-koa'));

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {object} [headers]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
async function generalRequest(url, method, body, headers, fullResponse) {
	console.log(arguments[3]);
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		headers,
		json: true,
		resolveWithFullResponse: fullResponse
	};
	
	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
	}

	try {
        console.log("Petición enviada a: ", url);
        return await request(parameters);
    } catch (err) {
        console.log("Se ha presentado un fallo");
        return err;
    } finally{
		console.log("Petición exitosa");
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */


/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */


/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

function formatErr(error) {
	const data = graphql.formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}

const authTypeDef = `
    type AccessToken{
        accessToken : String!
    }
    type UserLogin {
        statusCode : Int!
        method : String!
        message : String!
        data : AccessToken!
    }
    input UserLoginInput {
        UserName: String!
        Password: String!
    }



    type Validation{
        statusCode : Int!
        method : String!
        message : String!
    }

    `;

const authQueries = `
    authorize(jwt: String!): Validation!
`;

const authMutations = `
    login(user: UserLoginInput!): UserLogin!
`;

const url = 'host.docker.internal';
const port = '8000';
const entryPoint = 'api/v1';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		authorize: (_,{ jwt }) =>{
			const headers = {
				Authorization : "Bearer" + jwt
			};
			return generalRequest(`${URL}/validate`, 'GET',_,headers)
		}
			
	},
	Mutation: {
		login: (_, { user }) =>
			generalRequest(`${URL}/login`, 'POST', user),
	}
};

//Importar los motations, queries, typesdef y resolvers de cada ms
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
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedAuthTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers
	)
});

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 5000;

app.use(koaLogger());
app.use(koaCors());

// read token from header
app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9]+)/);
		if (token && token[1]) {
			ctx.state.token = token[1];
		}
	}
	await next();
});

// GraphQL
const graphql$1 = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql$1);
router.get('/graphql', graphql$1);


router.all('/playground', koaPlayground({ endpoint: '/graphql' }));

// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
