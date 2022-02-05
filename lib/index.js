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
var graphql = require('graphql');
var axios = _interopDefault(require('axios'));
require('lodash');
var koaPlayground = _interopDefault(require('graphql-playground-middleware-koa'));

//import request from 'request-promise-native';
/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [data]
 * @param {object} [headers]
 * @param {object} [params]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
async function generalRequest(url, method, data, headers, params, fullResponse) {
	console.log(arguments[3]);
	const parameters = {
		method,
		url: encodeURI(url),
		data,
		headers,
		params,
		resolveWithFullResponse: fullResponse
	};
	
	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
	}

	try {
        console.log("Petición enviada a: ", url);
		console.log("Parameters: ", parameters);
		return (await axios(parameters)).data
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
    type AccessToken {
        accessToken : String!
    }
    type UserLogin {
        statusCode : Int!
        method : String!
        message : String!
        data : AccessToken!
    }
    input UserLoginInput {
        username: String!
        password: String!
    }
    type UserGeneric {
        statusCode : Int!
        method : String!
        message : String!
    }
    input UserRegisterInput {
        username : String!
        full_name : String!
        email : String!
        password : String!
    }
    input UserResetInput {
        password: String!
        new_password: String!
    }
    type UserGenericData {
        statusCode : Int!
        method : String!
        message : String!
        data : String!
    }
    `;

const authQueries = `
    authorize(jwt: String!): UserGeneric!
    getusername(jwt: String!): UserGenericData!
`;

const authMutations = `
    login(user: UserLoginInput!): UserLogin!
    register(user: UserRegisterInput!): UserGeneric!
    reset(user: UserResetInput!, jwt: String!): UserGeneric!
`;

// export const url = '172.17.0.2'
// export const url = 'host.docker.internal'
require("dotenv").config();

const url = process.env.ACCOUNT_URL;
const port = '8000';
const entryPoint = 'api/v1';

//export const url = '172.17.0.2'
// export const url = 'host.docker.internal'
const url$1 = 'localhost';
const port$1 = '3030';
const entryPoint$1 = 'shopping-cart';

// export const url = '172.0.0.1'
const url$2 = 'localhost';
// export const url = 'host.docker.internal'
const port$2 = '3333';
const entryPoint$2 = 'products';

const URL$2 = `http://${url$2}:${port$2}/${entryPoint$2}`;

const resolvers$2 = {
	Query: {
		allProducts: (_, {}) => {
			return generalRequest(URL$2, 'GET');
		},
		productsById: (_, {id}) => {
			return generalRequest(`${URL$2}/${id}`, 'GET');
		},
		},
		Mutation: {
			addProduct: (_, { product }) => {
				return generalRequest(`${URL$2}`, 'POST', product);
			},
			updateProduct: (_, { id, product }) => {
				return generalRequest(`${URL$2}/${id}`, 'PUT', product);
			},
			deleteProduct: (_, {id}) => {
				return generalRequest(`${URL$2}/${id}`, 'DELETE');
			},
		},
	};

const URL$1 = `http://${url$1}:${port$1}/${entryPoint$1}`;

const resolvers$1 = {
	Query: {
        //query get all shooping lists NOT NECCESARY
		/*
        allShoppingLists: (_, {}) => {
			return generalRequest(URL, 'GET');
		},
        */
        //get shooping list by id
		shoppingListById: (_, {id}) => {
			let productList=[];
			async function doSomething() {
				let generalResponse= await generalRequest(`${URL$1}/${id}`, 'GET');
				productList=generalResponse.product_list;
				for(let product in productList){
					let producto= await resolvers$2.Query.productsById(_, {id:productList[product].product_id});
					productList[product].product=producto;
				}
				return generalResponse
			}
			return doSomething().then(final=>{
				return final
			})

		},

		/*historyByUsername: (_, {username}) => {
			return generalRequest(`${URL}/user/${username}`, 'GET');
		},
        */

        /*
		myShoopingList: async (_, {jwt}) =>{
			const authorize = await authResolvers.Query.authorize(_,{jwt});
			if(authorize.statusCode != 200)throw "Unauthorized"
			const message = await authResolvers.Query.getusername(_,{jwt});
			const username = message.data;
			const idHistory = await resolvers.Query.historyByUsername(_,{username});
			return resolvers.Query.historyById(_,idHistory);
		}
        */
		
		
	},
	Mutation: {
		createShoppingList: (_, {shoppingList}) => {
			return generalRequest(`${URL$1}`, 'POST', shoppingList);
		},
		updateShoppingList: (_, {id,shoppingList}) => {
			let productList=[];
			//return generalRequest(`${URL}/${id}`, 'PATCH', shoppingList);
			async function doSomething() {
				let generalResponse= await generalRequest(`${URL$1}/${id}`, 'PATCH', shoppingList);
				productList=generalResponse.product_list;
				for(let product in productList){
					let producto= await resolvers$2.Query.productsById(_, {id:productList[product].product_id});
					productList[product].product=producto;
				}
				return generalResponse
			}
			return doSomething().then(final=>{
				return final
			})
		},
		deleteShoppingList: (_, {id}) => {
			return generalRequest(`${URL$1}/${id}`, 'DELETE');
		},
		/*
        addItem: (_, {idHistory, item}) => {
			return generalRequest(`${URL}/additem/${idHistory}`, 'POST', item);
		},
		removeItem: (_, {idHistory, idItem}) => {
			const params = {
				idItem : idItem
			};
			return generalRequest(`${URL}/removeitem/${idHistory}`, 'DELETE', _, _,params);
		},
		removeAllItems: (_, {idHistory}) => {
			return generalRequest(`${URL}/removeallitems/${idHistory}`, 'DELETE');
		},
		addItemMyHistory: async (_, {jwt, item}) =>{
			const history = await resolvers.Query.mySearchHistory(_,{jwt});
			const idHistory = history.id;
			return resolvers.Mutation.addItem(_,{idHistory, item});
		},
		deleteItemMyHistory: async (_, {jwt, idItem}) =>{
			const history = await resolvers.Query.mySearchHistory(_,{jwt});
			const idHistory = history.id;
			return resolvers.Mutation.removeItem(_,{idHistory, idItem});
		},
		deleteMyHistory: async (_, {jwt}) =>{
			const history = await resolvers.Query.mySearchHistory(_,{jwt});
			const idHistory = history.id;
			return resolvers.Mutation.removeAllItems(_,{idHistory});
		}
        */
		
	}
};

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		authorize: (_,{ jwt }) => {
			const headers = {
				Authorization : "Bearer" + jwt
			};
			return generalRequest(`${URL}/validate`, 'GET', _, headers)
		},
		getusername: (_, { jwt }) => {
			const headers = {
				Authorization : "Bearer" + jwt
			};
			return generalRequest(`${URL}/username`, 'GET', _, headers)
		},
	},
	Mutation: {
		login: (_, { user }) =>{
			generalRequest(`${URL}/login`, 'POST', user);
		},
		register: (_, { user }) =>{
			const response=generalRequest(`${URL}/register`, 'POST', user);
			
			response.then(result$$1=>{
				if(result$$1.message=="Register new account successfully"){
					const nuevo={"_id":user.username,"product_list":[]};
					resolvers$1.Mutation.createShoppingList(_,{shoppingList:nuevo});

				}
				
			});
			
			return response
		},
			
		reset: (_, { user, jwt }) => {
			const headers = {
				Authorization : "Bearer" + jwt
			};
			return generalRequest(`${URL}/reset`, 'PUT', user, headers)
		},
	}
};

const productTypeDef = `
    input ProductInput {
        name : String!
        price : Int!
        description : String!
        stars: Int!
        image: String!
    }
    type Product {
        id : Int!
        name : String!
        price : Int!
        description : String!
        stars: Int!
        img_url: String!
    }
    `;

const productQueries = `
    allProducts: [Product]!
    productsById(id: Int!): Product!
`;

const productMutations = `
    addProduct(product: ProductInput!): Product!
    updateProduct(id: Int!,product: ProductInput!): Product!
    deleteProduct(id: Int!): Product!


`;

const addressTypeDef = `
    input AddressInput {
        country : String!
        city : String!
        state : String!
        zip_code : String!
        address : String!
    }
    type AddessGeneric {
        statusCode : Int!
        method : String!
        message : String!
    }
    type Address {
        AddressID: String!
        Country: String!
        City: String!
        State: String!
        ZipCode: String!
        Address: String!
        UserName: String!
        CreatedAt: String!
        UpdatedAt: String!
    }
    type AddressList {
        statusCode : Int!
        method : String!
        message : String!
        data : [Address]!
    }
    `;

const addressQueries = `
    list(jwt: String!): AddressList!
`;

const addressMutations = `
    add(address: AddressInput!, jwt: String!): AddessGeneric!
    delete(address: AddressInput!, jwt: String!): AddessGeneric!
`;

const URL$3 = `http://${url}:${port}/${entryPoint}`;

const resolvers$3 = {
	Query: {
		list: (_,{ jwt }) => {
			const headers = {
				Authorization : "Bearer" + jwt
			};
			return generalRequest(`${URL$3}/address`, 'GET', _, headers)
		},
	},
	Mutation: {
		add: (_, { address, jwt }) => {
			const headers = {
				Authorization : "Bearer" + jwt
			};
			return generalRequest(`${URL$3}/address`, 'POST', address, headers)
		},
        delete: (_, { address, jwt }) => {
			const headers = {
				Authorization : "Bearer" + jwt
			};
			return generalRequest(`${URL$3}/address`, 'DELETE', address, headers)
		},
	}
};

const historyTypeDef = `
    type SearchHistory {
        id: String!
        username: String!
        items: [SearchItem]!
    }
    type SearchItem {
        id: String!
        searchTime: String!
        productId: Int!
    }
    input SearchHistoryInput {
        username: String!
    }
    input SearchItemInput {
        productId: Int!
    }
    `;

const historyQueries = `
    allSearchHistories: [SearchHistory]!
    historyById(id: String!): SearchHistory!
    historyByUsername(username: String!): SearchHistory!
    mySearchHistory(jwt: String!): SearchHistory!
  `;

const historyMutations = `
    createHistory(history: SearchHistoryInput!): SearchHistory!
    updateHistory(id: String!, history: SearchHistoryInput!): SearchHistory!
    deleteHistory(id: String!): String
    addItem(idHistory: String!, item: SearchItemInput!): SearchHistory!
    removeItem(idHistory: String!, idItem: String!): SearchHistory!
    removeAllItems(idHistory: String!): SearchHistory!
    addItemMyHistory(jwt: String!, item: SearchItemInput!): SearchHistory!
    deleteItemMyHistory(jwt: String!, idItem: String!): SearchHistory!
    deleteMyHistory(jwt: String!): SearchHistory!
`;

//export const url = '172.17.0.2'
// export const url = 'host.docker.internal'
const url$3 = 'localhost';
const port$3 = '80';
const entryPoint$3 = 'searchhistory';

const URL$4 = `http://${url$3}:${port$3}/${entryPoint$3}`;

const resolvers$4 = {
	Query: {
		allSearchHistories: (_, {}) => {
			return generalRequest(URL$4, 'GET');
		},
		historyById: (_, {id}) => {
			return generalRequest(`${URL$4}/${id}`, 'GET');
		},
		historyByUsername: (_, {username}) => {
			return generalRequest(`${URL$4}/user/${username}`, 'GET');
		},
		mySearchHistory: async (_, {jwt}) =>{
			const authorize = await resolvers.Query.authorize(_,{jwt});
			if(authorize.statusCode != 200)throw "Unauthorized"
			const message = await resolvers.Query.getusername(_,{jwt});
			const username = message.data;
			const idHistory = await resolvers$4.Query.historyByUsername(_,{username});
			return resolvers$4.Query.historyById(_,idHistory);
		}
		
		
	},
	Mutation: {
		createHistory: (_, { history }) => {
			return generalRequest(`${URL$4}`, 'POST', history);
		},
		updateHistory: (_, { id, history }) => {
			return generalRequest(`${URL$4}/${id}`, 'PUT', history);
		},
		deleteHistory: (_, {id}) => {
			return generalRequest(`${URL$4}/${id}`, 'DELETE');
		},
		addItem: (_, {idHistory, item}) => {
			return generalRequest(`${URL$4}/additem/${idHistory}`, 'POST', item);
		},
		removeItem: (_, {idHistory, idItem}) => {
			const params = {
				idItem : idItem
			};
			return generalRequest(`${URL$4}/removeitem/${idHistory}`, 'DELETE', _, _,params);
		},
		removeAllItems: (_, {idHistory}) => {
			return generalRequest(`${URL$4}/removeallitems/${idHistory}`, 'DELETE');
		},
		addItemMyHistory: async (_, {jwt, item}) =>{
			const history = await resolvers$4.Query.mySearchHistory(_,{jwt});
			const idHistory = history.id;
			return resolvers$4.Mutation.addItem(_,{idHistory, item});
		},
		deleteItemMyHistory: async (_, {jwt, idItem}) =>{
			const history = await resolvers$4.Query.mySearchHistory(_,{jwt});
			const idHistory = history.id;
			return resolvers$4.Mutation.removeItem(_,{idHistory, idItem});
		},
		deleteMyHistory: async (_, {jwt}) =>{
			const history = await resolvers$4.Query.mySearchHistory(_,{jwt});
			const idHistory = history.id;
			return resolvers$4.Mutation.removeAllItems(_,{idHistory});
		}
		
	}
};

const ratingTypeDef = `
    scalar Date
    input comentariosInput {
        id_producto : Int!
        date_comment : String!
        rate_comment : Int!
        comment: String!
        user: String!
        email_user: String
    }

    input preguntaInput {
        date_pregunta : String
        pregunta : String!
        user : String!
        email_user: String!
    }
    input calificacionesInput {
        rate : Int!
        id_producto : Int!
        id_comprador : Int!
        
    }

    type comentarios {
        id_producto : Int!
        date_comment : String!
        rate_comment : Int!
        comment: String!
        user: String!
        email_user: String
    }
    type pregunta {
        date_pregunta : String!
        pregunta : String!
        user : String!
        email_user: String!
    }
    type calificaciones {
        rate : Int!
        id_producto : Int!
        id_comprador : Int!
    }
    `;

const ratingQueries = `
    comentarios_producto: [comentarios]!
    preguntas_producto:[pregunta]!
    calificaciones_producto:[calificaciones]!


`;

const ratingMutations = `
    comentarios_producto(comentarios: comentariosInput!): comentarios!
    preguntas_producto(pregunta:preguntaInput!): pregunta!
    calificaciones_producto(calificaciones: calificacionesInput!):calificaciones!


`;

// export const url = '172.0.0.1'
const url$4 = 'localhost';
// export const url = 'host.docker.internal'
const port$4 = '8001';
const entryPoint$4 = 'api';

const URL$5 = `http://${url$4}:${port$4}/${entryPoint$4}`;

const resolvers$5 = {
	Query: {
		comentarios_producto: (_, {}) => {
			return generalRequest(`${URL$5}/comentarios`, 'GET');
		},
		preguntas_producto: (_, {}) => {
			return generalRequest(`${URL$5}/pregunta`, 'GET');
		},
        calificaciones_producto: (_, {}) => {
			return generalRequest(`${URL$5}/calificaciones`, 'GET');
		},
		},
		Mutation: {
			comentarios_producto: (_, { comentarios }) => {
				return generalRequest(`${URL$5}/comentarios`, 'POST', comentarios);
			},
           preguntas_producto: (_, { pregunta }) => {
				return generalRequest(`${URL$5}/pregunta`, 'POST', pregunta);
			},
            calificaciones_producto: (_, { calificaciones }) => {
				return generalRequest(`${URL$5}/calificaciones`, 'POST', calificaciones);
			},
			
		},
	};

const purchaseTypeDef = `
    type productModelGet{
        id : Int!
        name : String!
        price : Int!
        description : String!
        stars: Int!
        img_url: String!
    }
    type purchaseProductModel{
        product_id: String!,
        quantity: Int!
    }
    type purchaseProductModelGet{
        product: productModelGet!,
        quantity: Int!
    }
    type purchaseCreateShoppingList {
        _id: String!,
        product_list: [purchaseProductModel]!
    }
    type purchaseUpdateShoppingList {
        _id: String!,
        product_list: [purchaseProductModelGet]!
    }
    type purchaseDeleteShoppingList {
        _id: String!,
        product_list: [purchaseProductModel]!
    }
    type purchaseGetShoppingList{
        _id: String!,
        product_list: [purchaseProductModelGet]!
    }
    input purchaseProductModelInput{
        product_id: String!,
        quantity: Int!
    }
    input purchaseCreateShoppingListInput{
        _id: String!,
        product_list:[purchaseProductModelInput]
    }
    input purchaseUpdateShoppingListInput{
        product_list:[purchaseProductModelInput]
    }
    `;

const purchaseQueries = `
    shoppingListById(id: String!): purchaseGetShoppingList!
  `;

const purchaseMutations = `
    createShoppingList(shoppingList: purchaseCreateShoppingListInput!): purchaseCreateShoppingList!
    updateShoppingList(id: String!, shoppingList: purchaseUpdateShoppingListInput!): purchaseUpdateShoppingList!
    deleteShoppingList(id: String!): purchaseDeleteShoppingList!
`;

const orderTypeDef = `
  type orderStateModel {
    id: Int
    order_id: Int
    statuses_id: Int
    description: String
    arriving_date: String
    created_at: String
    update_at: String
  }
  type orderModel {
    id: Int!
    user_id: Int!
    product_id: Int!
    quantity: Int!
    price: Float!
    total_price: Float!
    shipping_price: Float!
    payment_id: Int!
    shipping_address_id: Int!
    tracking_url: String
    created_at: String!
    update_at: String!
    code: Float!
  }
  type orderBuyAgain {
    product_id: Int!
    quantity: Int!
  }
  input orderCreateInput {
    user_id: Int!
    product_id: Int!
    quantity: Int!
    price: Float!
    total_price: Float!
    shipping_price: Float!
    payment_id: Int!
    shipping_address_id: Int!
  }
  input orderStateUpdate {
    statuses_id: Int!
    description: String!
    arriving_date: String!
  }
  input orderStateCreateInput {
    order_id: Int!
    status_code: Int!
    description: String!
    arriving_date: String!
  }
  input orderIdInput {
    order_id: Int!
  }
  input userIdInput {
    user_id: Int!
  }
  input orderTracking {
    tracking_url: String!
  }
`;
const orderQueries = `
  orderStateById(id: Int!): orderStateModel!
  orderStateByOrderId(orderId: orderIdInput!): [orderStateModel!]
  orderShow(id: Int!, user_id: userIdInput!): orderModel!
  orderBuyAgain(id: Int!): orderBuyAgain!
  orderHistory(user_id: userIdInput!): [orderModel!]
`;
const orderMutations = `
  orderStateCreate(state: orderStateCreateInput!): orderStateModel!
  orderStateDelete(id: Int!): String!
  orderStateUpdate(id: Int!, state: orderStateUpdate!): String!
  orderCreate(order: orderCreateInput!): orderModel!
  orderUpdate(id: Int!, order: orderCreateInput!): String
  orderDelete(id: Int!): String
  orderTracking(id: Int!, tracking: orderTracking!): String
`;

const url$5 = 'localhost';
const port$5 = '3000';
const entryPoint$5 = 'api/v1';

const URL$6 = `http://${url$5}:${port$5}/${entryPoint$5}`;

const resolvers$6 = {
  Query: {

    orderStateById: (_, {id}) => {
      return generalRequest(`${URL$6}/order_state/${id}`, 'GET');
    },
    orderStateByOrderId: (_, {orderId}) => {
      return generalRequest(`${URL$6}/states`, 'GET', orderId);
    },
    orderShow: (_, {id, user_id}) => {
      return generalRequest(`${URL$6}/order/${id}`, 'GET', user_id); 
    },
    orderBuyAgain: (_, {id}) => {
      return generalRequest(`${URL$6}/order-buy-again/${id}`, 'GET'); 
    },
    orderHistory: (_, {user_id}) => {
      return generalRequest(`${URL$6}/order-history`, 'GET', user_id); 
    }
  },
  Mutation: {
    orderStateCreate: (_,{ state }) =>{
      return generalRequest(`${URL$6}/order_state`, 'POST', state);
    },
    orderStateDelete: (_, {id}) => {
      return generalRequest(`${URL$6}/order_state/${id}`, 'DELETE');
    },
    orderStateUpdate: (_, {id, state}) => {
      return generalRequest(`${URL$6}/order_state/${id}`, 'PUT', state);
    },
    orderCreate: (_, {order}) => {
      return generalRequest(`${URL$6}/order`, 'POST', order);
    },
    orderUpdate: (_, {id, order}) => {
      return generalRequest(`${URL$6}/order/${id}`, 'PUT', order);
    },
    orderDelete: (_, {id}) => {
      return generalRequest(`${URL$6}/order/${id}`, 'DELETE');
    },
    orderTracking: (_, {id, tracking}) => {
      return generalRequest(`${URL$6}/order-tracking/${id}`, 'POST', tracking);
    }
  }
};

//ACCOUNT_MS
//Importar los mUtations, queries, typesdef y resolvers de cada ms

// Auth:
// Products:
// Address:
//SEARCH_HISTORY_MS

//Importar los mUtations, queries, typesdef y resolvers de cada ms

//product_rating_MS

//Importar los mUtations, queries, typesdef y resolvers de cada ms

//PRODUCT_PURCHASE_MS

//Importar los mUtations, queries, typesdef y resolvers de cada ms

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

var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge({ JSON: GraphQLJSON }, 
		resolvers,
		resolvers$3,
		resolvers$4,
		resolvers$1,
    resolvers$6,
		resolvers$2,
		resolvers$5,
	),
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
