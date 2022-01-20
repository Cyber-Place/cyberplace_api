import { generalRequest} from '../../../utilities';
import { url, port, entryPoint } from '../server';
import product_purchase_resolvers from '../../product_purchase/resolvers';
import { result } from 'lodash';

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
		login: (_, { user }) =>
			generalRequest(`${URL}/login`, 'POST', user),
		register: (_, { user }) =>{
			const response=generalRequest(`${URL}/register`, 'POST', user)
			
			response.then(result=>{
				if(result.message=="Register new account successfully"){
					const nuevo={"_id":user.username,"product_list":[]}
					product_purchase_resolvers.Mutation.createShoppingList(_,{shoppingList:nuevo})

				}
				
			})
			
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

export default resolvers;
